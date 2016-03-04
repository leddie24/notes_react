/** @jsx React.DOM */
var React = require('react');

var Note = React.createClass({
   getInitialState: function() {
      return {
         editing: false,
         editText: '',
         style: this.props.style
      }
   },
   componentDidMount: function() {
      var self = this;
      $(ReactDOM.findDOMNode(this)).draggable({
         stop: function(event, ui) {
              var pos = ui.helper.position(); // just get pos.top and pos.left
              self.updatePosition(pos);
         }
      });
   },
   randomBetween: function(min, max) {
      return (min + Math.ceil(Math.random() * max));
   },
   updatePosition: function(pos) {
      this.setState({
         left: pos.left,
         top: pos.top
      });
      var style = {
         left: pos.left,
         top: pos.top,
         transform: this.state.style.transform
      }
      this.props.updatePosition(style, this.props.index);
   },
   updateTextState: function(event) {
      this.setState({ editText: event.target.value })
   },
   edit: function(text) {
      this.setState({
         editing: true,
         editText: text
      });
   },
   fixCaret: function(event) { 
      var text = event.target.value;
      event.target.value = '';
      event.target.value = text;
   },
   save: function() {
      this.props.onChange(this.state.editText, this.props.index);
      this.setState({ editing: false });
   },
   remove: function() {
      this.props.onRemove(this.props.index);
   },
   renderDisplay: function() {
      return (
         <div className="note"
               style={this.state.style}>
            <div className="text">{this.props.children}</div>
            <div className="actions">
               <button onClick={this.edit.bind(null, this.props.children)}
                        className="btn btn-sm btn-primary glyphicon glyphicon-pencil" />
               <button onClick={this.remove} 
                        className="btn btn-sm btn-danger glyphicon glyphicon-trash" />
            </div>
         </div>)
   },
   renderForm: function() {
      return (
         <div className="note"
               style={this.state.style}>
            <textarea autoFocus
                     onFocus={this.fixCaret}
                     onChange={this.updateTextState}
                     defaultValue={this.state.editText}
                     className="form-control"></textarea>
            <div className="actions">
               <button onClick={this.save}
                        className="btn btn-sm btn-success glyphicon glyphicon-floppy-disk" />
            </div>
         </div>
      )
   },
   render: function() {
      if (this.state.editing) {
         return this.renderForm();
      } else {
         return this.renderDisplay();
      }
   }
});

module.exports = Note;