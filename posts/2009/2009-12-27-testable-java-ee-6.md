---
title: "Testable Java EE 6"
date: "2009-12-27"
published: true
---

OK, so some progress has been made.

I've abandoned using the Maven dependency indicated by Netbeans 6.8 and the org.codehaus.mojo.archetypes / webapp-javaee6 Maven 2 archetype and instead had to cobble together my own discreet dependencies from hints and clues. I would have much preferred actual documentation and facts :(

However I have reached my initial goal which was to use the same API jars marked "provided" for compilation and testing, and EclipseLink as an embedded JPA2 implementation during testing.

My Maven 2 project descriptor now has the following dependencies marked:

```xml
<dependency>
    <groupId>javax.persistence</groupId>
    <artifactId>persistence-api</artifactId>
    <version>2.0</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.servlet</groupId>
    <artifactId>servlet-api</artifactId>
    <version>3.0</version>
    <scope>provided</scope>
</dependency>
<dependency>
    <groupId>javax.ejb</groupId>
    <artifactId>ejb-api</artifactId>
    <version>3.1</version>
    <scope>provided</scope>
</dependency>

<dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>4.7</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.dbunit</groupId>
    <artifactId>dbunit</artifactId>
    <version>2.4.7</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql-jdbc3</artifactId>
    <version>8.2-504</version>
    <scope>test</scope>
</dependency>
<dependency>
    <groupId>org.eclipse.persistence</groupId>
    <artifactId>eclipselink</artifactId>
    <version>2.0.0</version>
    <scope>test</scope>
</dependency>
```

I have two persistence.xml files, one in src/main/resources for production deployment that refers to a container managed datasource, and one in src/test/resources for testing purposes. The testing descriptor refers manually to all Entity objects to be registered with JPA and ties directly via JDBC to my test database.

The API jars can likely all come from Glassfish v3, specifically the following files:

modules/javax.ejb.jar (assumed to be EJB 3.1 api) modules/javax.persistence.jar (assumed to be JPA 2 api) modules/javax.servlet.jar (assumed to be Servlet 3.0 api)

These binary files are covered by the CDDL or GPL licenses so I expect they're distributable but I'm hoping one day they end up on a public Maven repository somewhere so people can use them directly from their POM instead of having to manually install them in their local repository.
