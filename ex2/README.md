## Documentation and usage instruction for reusable dialog component

> Note:  See [Appendix](#appendix) for explanation for technical terms
> 
#### Basic functionalities
- Can be opened and closed when some events are triggered.
- Have an "X" button that can be used to close the dialog. Clicking outside of the dialog will close it as well if there are no unsaved contents inside the dialog content
  - For example: A form is rendered inside the dialog content, and a field is filled in with user's input, then closing the dialog by either **X** button or clicking *outside* of the dialog will not trigger the dialog close event.
- Can render content as wished from the parent component, which means support for
  - Text
  - Form (for example: submit action will close the dialog)
  - Components
- Height and width of the dialog should be configurable

#### Technical requirements
> From assignment requirements and some assumptions that not mentioned.
- Should expose public API that can be used by the parent component or child component.
  - Should have a public `open` and `close` methods for handling opening and closing the dialog
  - Should have a public hook functions `afterOpen` and `afterClose` for handling the callback events, after opening or closing the dialog.
- Should be able to receive data passed from the parent component
- Should be able to pass data to child component
- Only 1 dialog can be opened at a time

#### Future plan
- Add support for animations for the dialog component
- Keyboard interaction, such as tabbing 
- Add feature that allow receiving a specific icon to the dialog


<h4 id="appendix">Appendix</h4>
<li> Parent component is the component that is responsible for holding the dialog component </li>
<li> Child component is the component that is responsible for holding the assets inside the dialog content</li>