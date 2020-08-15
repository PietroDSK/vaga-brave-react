import React, { useState, FormEvent, MouseEvent, SyntheticEvent } from 'react';
import "./styles.css"
import Textbox from '../../Components/Textbox';

interface Elements {
  textBox: HTMLDivElement;
}

function Homepage () {

const [textBox, textBoxSetState] = useState([
{
  style: {},
  content: ''
}
]);


const [isDrawing, isDrawingSetState] = useState(false);
const [startAxisX, startAxisXSetState] = useState(0);
const [startAxisY, startAxisYSetState] = useState(0);
const [movedCursor, movedCursorSetstate] = useState(false);





function listBoxes() {
  const boxesCopy = textBox;
  const boxes = textBox.map((el, index)=> {
    const stateCopy: any = {};
    Object.assign(stateCopy, textBox[index].style)
    console.log(stateCopy)
    return (
    <div
    key={index}
    id={`Box:${index}`}
    style={stateCopy}
    >
      <Textbox
      value={textBox[index].content}
      onChange={(e) => textBox[index].content}
      />

    </div>
   )
     
  })
  return boxes;
  
}
function pointerDown(event: MouseEvent) {
event.preventDefault()
    const element: Elements = {
      textBox: document.createElement('div')
    }
    element.textBox.setAttribute('class', 'text-in-box')
    element.textBox.setAttribute('id', 'textBox')
    
    let x = event.clientX;
    let y = event.clientY;

    
    startAxisYSetState(y)
    startAxisXSetState(x)
    
    document.body.appendChild(element.textBox)
    const containerTest = (document.getElementById('textBox') as HTMLDivElement)
    containerTest.style.left = event.clientX + 'px';
    containerTest.style.top = event.clientY + 'px';
    containerTest.style.width = '0.01px';
    containerTest.style.height = '0.01px';
    isDrawingSetState(true)

}


function pointerMove(event: MouseEvent){
  event.preventDefault();
  
  if(isDrawing){
    movedCursorSetstate(true)
    const textBoxContainer = (document.getElementById('textBox') as HTMLTextAreaElement)
    if(event.clientX > startAxisX){
      textBoxContainer.style.width = (event.clientX - startAxisX) + 'px';
      
    }
    if(event.clientY > startAxisY) {
      textBoxContainer.style.height = (event.clientY - startAxisY) + 'px';
    }
    if(event.clientX === startAxisX) {
      textBoxContainer.style.width = '0.0001px';
    }
    if(event.clientY === startAxisY){
      textBoxContainer.style.height = '0.0001px';
    }
    if(event.clientX < startAxisX){
      textBoxContainer.style.width = (startAxisX - event.clientX) + 'px';
      textBoxContainer.style.left = (event.clientX) + 'px';
    }
    if(event.clientY < startAxisY){
      textBoxContainer.style.height = (startAxisY - event.clientX) + 'px';
      textBoxContainer.style.top = (event.clientY) + 'px';
    }
  }

}
function pointerUp(event: MouseEvent) {
    event.preventDefault()
    isDrawingSetState(false)  

    const textBoxContainer = (document.getElementById('textBox') as HTMLDivElement)

    if(textBoxContainer === null){
      movedCursorSetstate(false)
      return
    }

    const finalizingTextBox = textBoxContainer.getBoundingClientRect();
    if(movedCursor){

      let textBoxCopy: any = {};
      textBoxCopy['width'] = finalizingTextBox.width+'px';
      textBoxCopy['height'] = finalizingTextBox.height+'px';
      textBoxCopy['x'] = finalizingTextBox.x;
      textBoxCopy['y'] = finalizingTextBox.y;
      textBoxCopy['top'] = finalizingTextBox.top;
      textBoxCopy['left'] = finalizingTextBox.left;
      let box = {style:{}, content:''}
      Object.assign(box.style, textBoxCopy)
      textBoxSetState(oldArray =>[...oldArray, box])
      movedCursorSetstate(false)
      console.log(textBoxCopy )
    }

    const parent = (document.getElementById('containerBox') as HTMLTextAreaElement)
    try{
      if((document.getElementById('textBox') as HTMLTextAreaElement) !== undefined){
        parent.removeChild(textBoxContainer)
      }
    }catch(err){
      console.log(err)
    }
    
    
}


  return (
    <div id="containerBox" onMouseDown={pointerDown} onMouseUp={pointerUp} onMouseMove={pointerMove}>
      {listBoxes()}
    </div>
  );
}

export default Homepage