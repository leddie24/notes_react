/** @jsx React.DOM */

var React = require('react');
var Note = require('./Note');

var Board = React.createClass({
   getInitialState: function() {
      var notes = JSON.parse(localStorage.getItem('notes') || '[]');
      console.log(notes);
      return {
         notes: notes
      }
   },
   nextId: function() {
      var str_count = localStorage.getItem("noteCount");
      if (str_count == null || str_count == "null"){
         count = 0;
      } else {
         count = parseInt(str_count);
      }
      count++;  
      localStorage.setItem("noteCount", count);
      return count;
   },
   add: function() {
      var arr = this.state.notes;
      arr.push({
         id: this.nextId(),
         note: '',
         style: {
            left: this.randomBetween(0, window.innerWidth - 200) + 'px',
            top: this.randomBetween(0, window.innerHeight - 200) + 'px',
            transform: 'rotate(' + this.randomBetween(-10, 10) + 'deg)'
         }
      });
      localStorage.setItem('notes', JSON.stringify(arr));
      this.setState({notes: arr});
   },
   randomBetween: function(min, max) {
      var test = (min + Math.ceil(Math.random() * max));
      return test;
   },
   componentWillMount: function() {
      var self = this;
   },
   update: function(newText, i) {
      var arr = this.state.notes;
      arr[i].note = newText;
      localStorage.setItem('notes', JSON.stringify(arr));
      this.setState({notes: arr});
   },
   updatePosition: function(style, i) {
      var arr = this.state.notes;
      arr[i].style = style;
      localStorage.setItem('notes', JSON.stringify(arr));
      this.setState({
         notes: arr
      });
   },
   remove: function(i) {
      var arr = this.state.notes;
      arr.splice(i, 1);
      localStorage.setItem('notes', JSON.stringify(arr));
      this.setState({notes: arr});
   },
   eachNote: function(note, i) {
      return (
            <Note key={note.id}
                  index={i}
                  style={note.style}
                  updatePosition={this.updatePosition}
                  onChange={this.update}
                  onRemove={this.remove}
            >{note.note}</Note>
      );
   },
   render: function() {
      return (
         <div className="board">
            {this.state.notes.map(this.eachNote)}
            <button className="btn btn-sm glyphicon glyphicon-plus" 
                     onClick={this.add} />
         </div>
      )
   }
});

module.exports = Board;