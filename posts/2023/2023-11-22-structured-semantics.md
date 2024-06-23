---
title: Structured Semantics
date: 2023-11-22
published: true
image: images/cyborg_coach.jpg
imageAlt: A woman cyborg with grey hair and a mechanical arm with implants in her head jacked into the net facing the camera
tags:
  - machine
  - learning
  - agile
  - coaching
---

Back in June, I was playing with structured semantics as a way to interact with an LLM for applications. Today, I watched a video that made me realize I made quite a leap back there and may have left some folks behind. Time to catch up!

For those that have been following me, I've been exploring ways to leverage generative AI as a developer. This has had a lot of implications around how I write code, and also the kind of applications I want to write.

This little foray concerns the latter - what does it mean to write actual applications that are enhanced with generative AI technologies?

My main application of all this was my [LLM Meal Planner](https://github.com/svetzal/llm_meal_planner).  Feel free to check out the full source on github.

Here, I'll break down the basic things that have made this kind of application now possible.

## Modelling

The modelling in my sample code was quite basic. I could have gone much deeper, but I wanted to get the basic idea out so I could concentrate on richer models.

After I wrote LLM Meal Planner I went on to recreate a model I'd created about a decade ago in Ruby for some coaching management software, so that I could have the LLM create questionnaires and coaching plans automatically. Maybe that'll be a future post. It was a blast!

So, modelling is how we, as developers, define our problem and solution space for our applications.

In object-oriented designs, models define structured data and behaviour together so that we can interact with them.

Pydantic is a library for Python that lets you declare models with some precision.

### Problem Space

So the problem space was fairly simple, I needed to describe a household in enough detail so that the LLM could generate a meal plan.

The basic data I needed was simple, I declared a `HouseHold`:

```python
class Household(BaseModel):
    people: list[Person] = Field(default_factory=list, description="A list of people in the household")
    equipment: Equipment = Field(default_factory=Equipment, description="The cooking equipment in the household")
```

I declared equipment so that I wouldn't get recipe suggestions we couldn't cook. For example, if all someone had was a frying pan and a hot plate, they shouldn't get a meal plan that required them to use an oven.

```python
class Equipment(BaseModel):
    appliances: list[str] = Field(default_factory=list, description="A list of kitchen appliances")
    cookware: list[str] = Field(default_factory=list, description="A list of cookware")
```

There's a  lot of rich information here to describe to the LLM what it is we're talking about - this Pydantic model does a lot of heavy lifting to explain our problem domain.

Pydantic also lets you generate JSON Schema from your models, which is used to communicate to the OpenAI API how we want it to interpret our request and respond in a structured way rather than with just plain text.

For example, this is the JSON Schema for the `HouseHold` class:

```json
{
  "$defs": {
    "Allergy": {
      "properties": {
        "name": {
          "description": "The name of the allergy",
          "title": "Name",
          "type": "string"
        },
        "type": {
          "description": "The type of allergy",
          "title": "Type",
          "type": "string"
        }
      },
      "title": "Allergy",
      "type": "object"
    },
    "Equipment": {
      "properties": {
        "appliances": {
          "description": "A list of appliances",
          "items": {
            "type": "string"
          },
          "title": "Appliances",
          "type": "array"
        },
        "cookware": {
          "description": "A list of cookware",
          "items": {
            "type": "string"
          },
          "title": "Cookware",
          "type": "array"
        }
      },
      "title": "Equipment",
      "type": "object"
    },
    "FoodPreferences": {
      "properties": {
        "dislikes": {
          "description": "A list of dislikes",
          "items": {
            "type": "string"
          },
          "title": "Dislikes",
          "type": "array"
        },
        "likes": {
          "description": "A list of likes",
          "items": {
            "type": "string"
          },
          "title": "Likes",
          "type": "array"
        }
      },
      "title": "FoodPreferences",
      "type": "object"
    },
    "Person": {
      "properties": {
        "name": {
          "description": "The person's name",
          "title": "Name",
          "type": "string"
        },
        "email": {
          "description": "The person's email",
          "title": "Email",
          "type": "string"
        },
        "phone": {
          "description": "The person's cell phone number",
          "title": "Phone",
          "type": "string"
        },
        "allergies": {
          "description": "A list of allergies",
          "items": {
            "$ref": "#/$defs/Allergy"
          },
          "title": "Allergies",
          "type": "array"
        },
        "food_preferences": {
          "allOf": [
            {
              "$ref": "#/$defs/FoodPreferences"
            }
          ],
          "description": "The person's food preferences"
        }
      },
      "title": "Person",
      "type": "object"
    }
  },
  "properties": {
    "people": {
      "description": "A list of people in the household",
      "items": {
        "$ref": "#/$defs/Person"
      },
      "title": "People",
      "type": "array"
    },
    "equipment": {
      "allOf": [
        {
          "$ref": "#/$defs/Equipment"
        }
      ],
      "description": "The equipment in the household"
    }
  },
  "title": "Household",
  "type": "object"
}
```

Docstrings are also quite useful when defining calculated properties and behaviours in your classes:

```python
@property  
def food_allergies(self):  
    """A list of food allergies"""  
    return list(set([allergy for person in self.people for allergy in person.food_allergies]))
```

This is a bit hackish, but it uses a nested list comprehension to extract all of the food allergies in the household as a property of the household. No shellfish in the house please!

Again, defining our problem and solution space in this way provides a rich natural language to expand meaning, combined with code-level semantic clarity on how it all fits together.

### Solution Space

Of course, our goal for the LLM is to create a meal plan, and we want structured data back for that too. Here's the modelling I used, I think I was starting to get lazy:

```python
class DayMealPlan(BaseModel):  
    breakfast: str = Field(default_factory=list, description="Breakfast description")  
    morning_snack: str = Field(default_factory=list, description="Morning snack description")  
    lunch: str = Field(default_factory=list, description="Lunch description")  
    afternoon_snack: str = Field(default_factory=list, description="Afternoon snack description")  
    dinner: str = Field(default_factory=list, description="Dinner description")  
    evening_snack: str = Field(default_factory=list, description="Evening snack description")  
  
  
class MealPlan(BaseModel):  
    days: list[DayMealPlan] = Field(default_factory=list, description="A list of day meal plans")
```

You can see my language is starting to get awkward, like `DayMealPlan`.

And this is a critical point I want to make.

The art of software development is all in framing. In setting yourself up to write the best kind of implementation code to solve the problem.

If you skip this modelling step,  the framing, if you don't work diligently to extract and clarify it as you work on your implementation, your code is going to be difficult for others to understand. Worse, though, you will miss opportunities to recognize ways you can simplify the problem.

Remember, **good code is just documentation for our co-workers that the compiler can understand.**

And in this case, it is also key to guiding the LLM to generate the best kind of response for us.

