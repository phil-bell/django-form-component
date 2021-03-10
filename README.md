# django-form-component

`django-form` is a Web Component wrapper for [Django Forms](https://docs.djangoproject.com/en/3.1/topics/forms/#the-template)

`django-form` uses js fetch to submit the forms to your api endpoint of choise instead of the traditional django forms functionality of submitting the entire page.

### Install

```
npm install django-form-component
```

### Usage

`index.js`

```js
import "django-form-component"
```

`index.html`

```html
<django-form action="api/send/" method="post" button="send">
  {{ send_form.as_p }}
</django-form>
```

### Attributes

`action` - the url/api you are sending the form to

`method` - the request type you'd like, eg `post` `get` `put`. Default - `post`

`button` - the text that will be on the submit button. Default - `Add`

You then place you Django form in the slot like seen above and it will be used by the components.
