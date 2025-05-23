---
title: formData - Form Submission Data
description: Access submitted form data in PocketPages templates, with support for various form field types and file uploads.
---

# `formData` - Parsed Request Body (alias of [body](/docs/context-api/body))

- **Type**: `() => Record<string, any> | string`
- **Description**: Returns the request body, parsed by Pocketbase according to the request's Content-Type. Supported types include JSON, XML and form-data.

## Basic Usage

### Simple Form Example

```ejs
<%% let data = {}; %>
<%% if (request.method === 'POST') { %>

    <%% data = formData(); %>

    <%% if (data.email && data.message) { %>
        <div class="alert success">
            Form submitted successfully!
        </div>
    <%% } else { %>
        <div class="alert error">
            Please fill in all required fields.
        </div>
    <%% } %>
<%% } %>

<form method="POST">
    <div class="form-group">
        <label for="email">Email:</label>
        <input type="email"
               id="email"
               name="email"
               value="<%%= data.email || '' %>">
    </div>

    <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message"
                  name="message"><%%= data.message || '' %></textarea>
    </div>

    <button type="submit">Send</button>
</form>
```

## Form Field Types

### Text Inputs

```ejs
<%% let data = formData(); %>

<form method="POST">
    <!-- Single-line text -->
    <input type="text" name="username" value="<%%= data.username || '' %>">

    <!-- Password -->
    <input type="password" name="password">

    <!-- Email -->
    <input type="email" name="email" value="<%%= data.email || '' %>">

    <!-- Multi-line text -->
    <textarea name="bio"><%%= data.bio || '' %></textarea>
</form>
```

### Checkboxes and Radio Buttons

```ejs
<%% let data = formData(); %>

<form method="POST">
    <!-- Single checkbox -->
    <input type="checkbox"
           name="subscribe"
           value="yes"
           <%%= data.subscribe === 'yes' ? 'checked' : '' %>>

    <!-- Multiple checkboxes -->
    <input type="checkbox"
           name="interests[]"
           value="coding"
           <%%= data.interests?.includes('coding') ? 'checked' : '' %>>
    <input type="checkbox"
           name="interests[]"
           value="design"
           <%%= data.interests?.includes('design') ? 'checked' : '' %>>

    <!-- Radio buttons -->
    <input type="radio"
           name="gender"
           value="male"
           <%%= data.gender === 'male' ? 'checked' : '' %>>
    <input type="radio"
           name="gender"
           value="female"
           <%%= data.gender === 'female' ? 'checked' : '' %>>
</form>
```

### Select Dropdowns

```ejs
<%% let data = formData(); %>

<form method="POST">
    <!-- Single select -->
    <select name="country">
        <option value="">Select Country</option>
        <option value="us" <%%= data.country === 'us' ? 'selected' : '' %>>
            United States
        </option>
        <option value="uk" <%%= data.country === 'uk' ? 'selected' : '' %>>
            United Kingdom
        </option>
    </select>

    <!-- Multiple select -->
    <select name="skills[]" multiple>
        <option value="js"
                <%%= data.skills?.includes('js') ? 'selected' : '' %>>
            JavaScript
        </option>
        <option value="php"
                <%%= data.skills?.includes('php') ? 'selected' : '' %>>
            PHP
        </option>
    </select>
</form>
```

## Complete Example

```ejs
<%%
let data = formData();

if (request.method === 'POST') {
    // Validate required fields
    const required = ['name', 'email', 'message']
    const missing = required.filter(field => !data[field])

    if (missing.length > 0) {
        response.status(400)
        %>
        <div class="alert error">
            Missing required fields: <%%= missing.join(', ') %>
        </div>
        <%%
    } else {
        // Process the form data
        try {
            $app.dao().saveRecord('messages', {
                name: data.name,
                email: data.email,
                message: data.message,
                interests: data.interests || [],
                newsletter: data.newsletter === 'yes'
            })
            redirect('/thank-you')
            return
        } catch (error) {
            response.status(500)
            %>
            <div class="alert error">
                Failed to save message: <%%= error.message %>
            </div>
            <%%
        }
    }
}
%>

<form method="POST" class="contact-form">
    <!-- Personal Information -->
    <fieldset>
        <legend>Personal Information</legend>

        <div class="form-group">
            <label for="name">Name:</label>
            <input type="text"
                   id="name"
                   name="name"
                   value="<%%= data.name || '' %>"
                   required>
        </div>

        <div class="form-group">
            <label for="email">Email:</label>
            <input type="email"
                   id="email"
                   name="email"
                   value="<%%= data.email || '' %>"
                   required>
        </div>
    </fieldset>

    <!-- Message -->
    <fieldset>
        <legend>Your Message</legend>

        <div class="form-group">
            <label for="message">Message:</label>
            <textarea id="message"
                      name="message"
                      required><%%= formData.message || '' %></textarea>
        </div>
    </fieldset>

    <!-- Preferences -->
    <fieldset>
        <legend>Preferences</legend>

        <div class="form-group">
            <label>Interests:</label>
            <div class="checkbox-group">
                <label>
                    <input type="checkbox"
                           name="interests[]"
                           value="updates"
                           <%%= formData.interests?.includes('updates') ? 'checked' : '' %>>
                    Product Updates
                </label>
                <label>
                    <input type="checkbox"
                           name="interests[]"
                           value="news"
                           <%%= formData.interests?.includes('news') ? 'checked' : '' %>>
                    Company News
                </label>
            </div>
        </div>

        <div class="form-group">
            <label>
                <input type="checkbox"
                       name="newsletter"
                       value="yes"
                       <%%= formData.newsletter === 'yes' ? 'checked' : '' %>>
                Subscribe to newsletter
            </label>
        </div>
    </fieldset>

    <button type="submit">Send Message</button>
</form>

<!-- Debug Information -->
<%% if (request.method === 'POST') { %>
    <details>
        <summary>Submitted Form Data</summary>
        <pre><%%= stringify(formData()) %></pre>
    </details>
<%% } %>
```

## Important Notes

1. `formData` is an alias of `body`, they both get the parsed request object via Pocketbase JSVM `e.requestInfo().body`
2. `formData` is only populated on POST requests
3. Values are automatically decoded and parsed
4. Array fields (like multiple checkboxes) use `[]` in the name
5. Empty fields are submitted as empty strings
6. Unchecked checkboxes are not included in `formData`
7. Always validate and sanitize form data before using it

## Best Practices

1. Always validate required fields
2. Provide default values using `||` operator
3. Sanitize data before storing or displaying
4. Use appropriate input types for better validation
5. Include CSRF protection for production forms
6. Handle errors gracefully
7. Show clear feedback messages
8. Preserve form data on validation errors

See [Form Handling](/docs/forms) for more detailed information about working with forms in PocketPages.
