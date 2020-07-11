---
title: "Wow, this isn't the Web Services I used to know..."
date: "2007-11-10"
published: true
---

OK, so around 2005 we did some projects with WebServices.

They were successful, but we wrote a lot more code than we wanted to. We hand-coded the WSDL to get the best interoperability between platforms (Java and .NET), and because if we'd used auto-generated WSDL it was an absolute disaster (no big shocker we had interop problems).

And the persistence layer was a nightmare. We were brokering data between persistent objects and WSDL-generated stubs, and the WSDL-generated stubs had no support for object-equality like we needed in the persistence tier, so this lead to a LOT of boiler-plate code.

Here's what I wrote this morning:

\[sourcecode language="Java"\] @Stateless @WebService public class SimpleServiceBean implements SimpleServiceRemote {

@WebMethod public String getMessage() { return "Hello, World!"; }

}\[/sourcecode\] Not a big shocker there, Java EE 5 makes things a lot easier, especially with all the XML removed. What did impress me however, was looking at the WSDL. It was clean. Pretty darn close to what I'd have coded by hand.Generating a client-side test through JAX-WS was equally fun (yeah, I'm a NetBeans fanboy these days so I just used the Wizard to generate the WS client stubs in my project): \[sourcecode language="Java"\] public class Main { public static void main(String\[\] args) throws Exception {

SimpleServiceBeanService service = new SimpleServiceBeanService(); SimpleServiceBean ss = service.getSimpleServiceBeanPort();

System.out.println( "Message: " + ss.getMessage());

} }\[/sourcecode\] So that was cool, but how easy would it be to do some actual work? So I set up an Entity model bean called Recipient (which I won't post, but it was simple too), had an EntityManager injected into my service bean, made a function to save a Recipient (which in JPA can also create them). Notice how I return the recipient object returned by the .merge() operation so that it has it's identity field properly filled out... \[sourcecode language="Java"\] @Stateless @WebService public class SimpleServiceBean implements SimpleServiceRemote {

@PersistenceContext EntityManager em;

@WebMethod public String getMessage() { return "Hello, World!"; }

@WebMethod public Recipient saveRecipient(Recipient r) { return em.merge(r); }

}\[/sourcecode\] And then modified the client... (notice how I don't set the identity of the Recipient, so that the server knows it needs to create rather than save this object) \[sourcecode language="Java"\] public class Main { public static void main(String\[\] args) throws Exception {

SimpleServiceBeanService service = new SimpleServiceBeanService(); SimpleServiceBean ss = service.getSimpleServiceBeanPort();

Recipient r = new Recipient(); r.setEmail("steve@threewisemen.ca"); r.setName("Steven Vetzal");

r = ss.saveRecipient(r);

System.out.println( r.getName()+" "+r.getEmail()+" "+r.getId());

} }\[/sourcecode\] And that was it. Simple client - server data brokering and persistence using proper WebServices, with very very little boilerplate code.

Now the example is truly simplistic. For example, the generated Recipient class (that was joyously auto-generated from the auto-generated WSDL that was generated from my proper model class) does not have any object equality code in place (.equals() and .hashcode() methods) so that will cause me grief in Swing and JSF clients that need to render and work with a UI full of these entities. But it is squeaky clean without a single crazy additional method enforced by the infrastructure - it's just a POJO with some XML annotations to help JAXB along.

But I'm going to selfishly wallow in this simplicity for the next day or two anyways just for fun :)
