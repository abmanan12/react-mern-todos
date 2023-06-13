import { useEffect, useState } from 'react';
import './App.scss';

import axios from 'axios';
import 'bootstrap/dist/js/bootstrap.bundle';


const initialState = {
  title: '',
  location: '',
  description: ''
}

function App() {

  const URL = 'http://localhost:8000'

  const [state, setState] = useState(initialState)
  const [myTodos, setMyTodos] = useState([])
  const [updateUi, setUpdateUi] = useState(false)


  const handleChange = e => {
    setState(s => ({ ...s, [e.target.name]: e.target.value }))
  }

  useEffect(() => {
    axios.get(`${URL}/readTodo`)
      .then((res) => {
        setMyTodos(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
  }, [updateUi])

  const handleSubmit = e => {
    e.preventDefault()

    const { title, location, description } = state

    if (title.length < 3) {
      return console.log("Please enter your title correctly")
    }

    if (location.length < 3) {
      return console.log("Please enter your location correctly")
    }

    if (description.length < 10) {
      return console.log("Please enter description length Min 10")
    }

    let todo = { title, location, description }

    axios.post(`${URL}/createTodo`, todo)
      .then((res) => {

        setUpdateUi(prevState => !prevState)

        setState(initialState);

        console.log('Todo Created');

      })
      .catch((err) => {
        console.log(err);
      })

  }

  const handleEdit = todo => {

    axios.post(`${URL}/updateTodo`, todo)
      .then((res) => {
        setUpdateUi(prevState => !prevState)
        console.log("Todo Updated");
      })
      .catch((err) => {
        console.log(err);
      })

  }

  const handleDelete = todo => {

    axios.post(`${URL}/deleteTodo`, todo)
      .then((res) => {
        setUpdateUi(prevState => !prevState)
        console.log("Todo Deleted");
      })
      .catch((err) => {
        console.log(err);
      })

  }


  return (
    <>

      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <div className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col-12">
              <h4 className="fw-bold text-center">Add Your Task</h4>
            </div>
          </div>
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="card p-3 shadow-lg border-0">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-12 col-md-6 mb-3">
                      <div className="input-group">
                        <input type="text" name="title" className="form-control shadow-none"
                          value={state.title} placeholder="Title" aria-label="Recipient's username"
                          aria-describedby="button-addon2" onChange={handleChange} />
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-3">
                      <div className="input-group">
                        <input type="text" name="location" className="form-control shadow-none"
                          value={state.location} placeholder="Location" aria-label="Recipient's username"
                          aria-describedby="button-addon2" onChange={handleChange} />
                      </div>
                    </div>

                    <div className="col-12">
                      <div className="input-group">
                        <textarea className="form-control shadow-none" name="description"
                          value={state.description} placeholder="Description" aria-label="Recipient's username"
                          aria-describedby="button-addon2" onChange={handleChange}></textarea>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="mt-3">
                        <button className='btn btn-danger mt-2 w-50'>Add Todo</button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>


      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <div className="py-5">
        <div className="container">
          <div className="row mb-4">
            <div className="col">
              <h4 className="fw-bold text-center">My Todos</h4>
            </div>
          </div>
          <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
            <div className="card p-2 shadow-lg border-0">
              <div className="card-body">

                <table className='table table-responsive text-center'>
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Title</th>
                      <th scope="col">Location</th>
                      <th scope="col">Description</th>
                      <th scope="col">Action</th>
                    </tr>
                    {
                      myTodos.map((elem, i) => {
                        return (
                          <tr key={i}>
                            <td scope="col">{i + 1}</td>
                            <td scope="col">{elem.title}</td>
                            <td scope="col">{elem.location}</td>
                            <td scope="col">{elem.description}</td>
                            <td scope="col"><button className='btn btn-info btn-sm me-1' data-bs-toggle="modal" data-bs-target="#editModel" onClick={() => { setState(elem) }}>Edit</button>
                              <button className='btn btn-danger btn-sm me-1' onClick={() => { handleDelete(elem) }}>Delete</button></td>
                          </tr>
                        )
                      })
                    }
                  </thead>
                </table>

              </div>
            </div>
          </div>
        </div>
      </div>


      {/* /////////////////////////////////////////////////////////////////////////////// */}
      <div className="modal fade" id="editModel">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Todo</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="col">
                <div className="row">
                  <div className="col">
                    <input type="text" className='form-control shadow-none mb-3' name='title' value={state.title} placeholder='Title' onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="text" className='form-control shadow-none mb-3' name='location' value={state.location} placeholder='Location' onChange={handleChange} />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <input type="text" className='form-control shadow-none mb-1' name='description' value={state.description} placeholder='Description' onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={() => { handleEdit(state) }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default App;
