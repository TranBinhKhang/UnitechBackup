import React, { useState, useContext } from 'react';
import {Folders, Undo} from '../Context/ContextProvider';

function FolderNew({id}) {

const {folders, setFolders } = useContext(Folders);
const { undoState, setUndoState } = useContext(Undo);
const [editName, setEditName] = useState();
const [newName, setNewName] = useState();
const index = folders.findIndex(folder => folder.id === id);

const open = () => {
    
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].isOpened = !middle[index].isOpened
    setFolders(middle);
}

const showFolder = () => {
    
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].showInput = !middle[index].showInput;
    setFolders(middle);
}


const showEditBar = () => {
    
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].showEdit = !middle[index].showEdit;
    setFolders(middle);
  }

  const deleteFolder = () => {
    undoState.push(folders)
    
    let middle = JSON.parse(JSON.stringify(folders));
    middle.splice(index, 1);
    setFolders(middle);
  }

  const editFolderName = () => {
    undoState.push(folders);
    undoState.push(folders);
    let middle = JSON.parse(JSON.stringify(folders));
    middle[index].name = editName;
    setFolders(middle);
  }

  const addFolder = () => {
    undoState.push(folders);
    console.log(undoState);
     let middle = JSON.parse(JSON.stringify(folders));
     middle.push({  
        "id": Math.floor(Math.random() * (99999999999999999 - 1000 + 1)) + 1000,
         "name": newName,
         "isOpened": true,
         "showInput": false,
         "showEdit": false,
         "parent": id,
     })
     setFolders(middle);
    }
    const handleEditChange = (e) => {
      setEditName(e.target.value);
    }
  
  const handleFolderName = (e) => {
      setNewName(e.target.value);
    }


  return (
    <React.Fragment>
    <div style={{flex: 1}}>
    <p style={{left: 40}}><span><button onClick={open}>{folders[index].isOpened ? '▲' : '▼' }</button></span>📁{folders[index].name}  <span><button onClick={() => {showFolder(); setNewName('New Folder')}}>+</button> <button onClick={() => {showEditBar(); setEditName(folders[index].name)}}>✏</button> <button onClick={deleteFolder}>🗑</button></span></p>
    {folders[index].showInput && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleFolderName} /> <button onClick={addFolder}>Add new folder</button></div>}
    {folders[index].showEdit && <div style={{float: 'inline-start', marginLeft: 30}}><input onChange={handleEditChange} /> <button onClick={editFolderName}>Edit name</button></div>}
    </div>
    {folders[index].isOpened && folders.filter(child => child.parent == id).map( (child, key) => <ul key={key}><li><FolderNew id={child.id} /></li></ul>) }
    </React.Fragment>
  );
}

export default FolderNew;