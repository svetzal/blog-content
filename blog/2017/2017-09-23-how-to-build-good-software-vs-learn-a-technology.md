---
title: "How To Build Good Software vs. Learn a Technology"
date: "2017-09-23"
published: true
---

## The Problem

Go find any "learn X in 21 days", “X boot camp” training material and look at how it treats Technology X.

Go to the Angular or React or Aurelia or VueJS or EmberJS site and do the QuickStart tutorial on it. Look at the way the technology is presented to you.

> _We continually teach developers who are hungry to learn new technology how to use it **in a way that tightly couples them to it**._

We are encouraging new developers to tightly couple in one breath and then complaining about the “churn” in web technology frameworks in the next.

I think we can do better.

## The Symptom

Consider a React component that is a simple RPN calculator, here is some of the code (sorry for the bad JSX formatting):

class Calculator extends React.Component {
  constructor() {
    super();
    this.state = {error: false, values: \[\], input: ''};
    this.inputDidChange = this.inputDidChange.bind(this);
  }

  get operations() {
    return \[ '+', '-', '\*', '/' \];
  }

  userDidPressEnter() {
    if (this.state.error) return;
    this.addToValuesIfNumeric(this.state.input);
    this.setState({input: ''});
  }

  userDidPressOperator(op) {
    if (this.state.error) return;
    this.addToValues(op);
    this.calculate();
  }

  userDidPressClear() {
    this.setState({values: \[\], error: false});
  }

  addToValuesIfNumeric(input) {
    let value = parseFloat(input);
    if (!isNaN(value)) this.addToValues(value);
  }

  addToValues(value) {
    this.state.values.push(value);
    this.setState({values: this.state.values});
  }

  inputDidChange(event) {
    let newValue = event.target.value.replace(/\[^0-9\\.\]/g, '');
    this.setState({input: newValue});
  }

  calculate() {
    let stack = \[\];
    this.state.values.forEach(el => {
      if (typeof(el) === 'number') stack.push(el);
      else {
        let b = stack.pop();
        let a = stack.pop();
        if (typeof(a) === 'undefined' || typeof(b) === 'undefined') {
          this.setState({error: true});
        } else {
          switch(el) {
            case '+':
              stack.push(a + b);
              break;
            case '-':
              stack.push(a - b);
              break;
            case '/':
              stack.push(a / b);
              break;
            case '\*':
              stack.push(a \* b);
              break;
          }
        }
      }
    });

    this.setState({values: stack});
  }

  statusClass() {
    return this.state.error ? 'error' : '';
  }

  render() {
    return (
      <section className="calculator">
          <ol className={this.statusClass()}>
            {this.state.values.map(v => <li>{v}</li>)}
          </ol>
        <section className="input">
          <input type="text" value={this.state.input}
                 placeholder="Click to type a number"
                 onChange={this.inputDidChange}></input>
          <button onClick={() => this.userDidPressEnter()}>Enter</button>
        </section>
        <ul>
          {this.operations.map(op => {
            return <li>
              <button
                onClick={() => this.userDidPressOperator(op)}>{op}</button>
            </li>;
          })}
          <li>
            <button onClick={() => this.userDidPressClear()}>Clear</button>
          </li>
        </ul>
      </section>
    );
  }
}

ReactDOM.render(<Calculator/>, document.getElementById('app'));

## Cleaning Up

Now let’s thin this component out to just the React code that delegates to an extracted RPN implementation:

class RPN {
  constructor() {
    this.values = \[\];
  }

  get operations() {
    return \[ '+', '-', '\*', '/' \];
  }

  addToValuesIfNumeric(input) {
    let value = parseFloat(input);
    if (!isNaN(value)) this.addToValues(value);
  }

  addToValues(value) {
    this.values.push(value);
    this.calculate();
  }

  calculate() {
    console.log(this.values);
    let stack = \[\];
    this.values.forEach(el => {
      if (typeof(el) === 'number') stack.push(el);
      else {
        let b = stack.pop();
        let a = stack.pop();
        if (typeof(a) === 'undefined' || typeof(b) === 'undefined') {
          throw("too few operands");
        } else {
          switch(el) {
            case '+':
              stack.push(a + b);
              break;
            case '-':
              stack.push(a - b);
              break;
            case '/':
              stack.push(a / b);
              break;
            case '\*':
              stack.push(a \* b);
              break;
          }
        }
      }
    });

    this.values = stack;
  }

}

class Calculator extends React.Component {
  constructor() {
    super();
    this.rpn = new RPN();
    this.state = {error: false, values: \[\], input: ''};
    this.inputDidChange = this.inputDidChange.bind(this);
  }

  userDidPressEnter() {
    if (this.state.error) return;
    this.rpn.addToValuesIfNumeric(this.state.input);
    this.setState({input: '', values: this.rpn.values});
  }

  userDidPressOperator(op) {
    if (this.state.error) return;
    try {
      this.rpn.addToValues(op);
      this.setState({values: this.rpn.values});
    } catch(err) {
      this.setState({error: true});
    }
  }

  userDidPressClear() {
    this.setState({values: \[\], error: false});
  }

  inputDidChange(event) {
    let newValue = event.target.value.replace(/\[^0-9\\.\]/g, '');
    this.setState({input: newValue});
  }

  statusClass() {
    return this.state.error ? 'error' : '';
  }

  render() {
    return (
      <section className="calculator">
          <ol className={this.statusClass()}>
            {this.state.values.map(v => <li>{v}</li>)}
          </ol>
        <section className="input">
          <input type="text" value={this.state.input}
                 placeholder="Click to type a number"
                 onChange={this.inputDidChange}></input>
          <button onClick={() => this.userDidPressEnter()}>Enter</button>
        </section>
        <ul>
          {this.rpn.operations.map(op => {
            return <li>
              <button
                onClick={() => this.userDidPressOperator(op)}>{op}</button>
            </li>;
          })}
          <li>
            <button onClick={() => this.userDidPressClear()}>Clear</button>
          </li>
        </ul>
      </section>
    );
  }
}

ReactDOM.render(<Calculator/>, document.getElementById('app'));

Look at how it has become clearer, the boundaries between what is React specific and what is application logic?

Now, if we know what the RPN class does, and we just want to learn how to use React, we can shorten the example to just:

class Calculator extends React.Component {
  constructor() {
    super();
    this.rpn = new RPN();
    this.state = {error: false, values: \[\], input: ''};
    this.inputDidChange = this.inputDidChange.bind(this);
  }

  userDidPressEnter() {
    if (this.state.error) return;
    this.rpn.addToValuesIfNumeric(this.state.input);
    this.setState({input: '', values: this.rpn.values});
  }

  userDidPressOperator(op) {
    if (this.state.error) return;
    try {
      this.rpn.addToValues(op);
      this.setState({values: this.rpn.values});
    } catch(err) {
      this.setState({error: true});
    }
  }

  userDidPressClear() {
    this.setState({values: \[\], error: false});
  }

  inputDidChange(event) {
    let newValue = event.target.value.replace(/\[^0-9\\.\]/g, '');
    this.setState({input: newValue});
  }

  statusClass() {
    return this.state.error ? 'error' : '';
  }

  render() {
    return (
      <section className="calculator">
          <ol className={this.statusClass()}>
            {this.state.values.map(v => <li>{v}</li>)}
          </ol>
        <section className="input">
          <input type="text" value={this.state.input}
                 placeholder="Click to type a number"
                 onChange={this.inputDidChange}></input>
          <button onClick={() => this.userDidPressEnter()}>Enter</button>
        </section>
        <ul>
          {this.rpn.operations.map(op => {
            return <li>
              <button
                onClick={() => this.userDidPressOperator(op)}>{op}</button>
            </li>;
          })}
          <li>
            <button onClick={() => this.userDidPressClear()}>Clear</button>
          </li>
        </ul>
      </section>
    );
  }
}

## Beyond The Trivial

Think about how useless most contrived examples are. How many frameworks and platforms have you implemented that “hello world” style todo list upon. It doesn’t take too many years in this field until you’ve done dozens.

Then, when you try to go further past the tutorial you inevitably hit the rough edges that they had no way to cover in the trivial example. Your real world code raises questions for which you weren't prepared. It pushes on your newly forming mental model of the new technology, and things get confused.

So use plain Javascript to go beyond the trivial. Tuck that code away somewhere, because it's mostly irrelevant. Build out as much as you want. Students only have to casually understand its flow. My RPN example isn't much past trivial, but I think it still shows the point.

You'll have to spend some time explaining the example, but honestly if you're talking to a JavaScript developer, regardless of what framework they want to use, it ought to make sense to them.

I think there are several advantages to this approach:

- it will focus students on the technology
- you can use the same model to teach several technologies
- you will both learn how to build and teach code that survives shifting idioms (ie reactive versus bound property approaches)
- you will stop having to oversimplify domains so that the application code doesn’t outnumber the framework specific code, lets use some more realistic scenarios rather than just todo list

What do you think?
