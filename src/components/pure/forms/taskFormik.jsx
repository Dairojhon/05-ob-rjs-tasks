import React from 'react';
import { Task } from '../../../models/task.class';
import { LEVELS } from '../../../models/levels.enum';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const taskSchema = Yup.object().shape(
    {
        name: Yup.string()
                .required('Name is required'),
        description: Yup.string()
                .required('Description is required'),
        level: Yup.string()
                .oneOf([LEVELS.NORMAL, LEVELS.BLOCKING,LEVELS.URGENT, 'You must select a level: normal/ urgent/ blocking '])
                .required('Level is required')
    }
);

const TaskFormik = ({add}) => {

    //let task = new Task()

    const initialTaskValues = {
        name:'',
        description:'',
        completed: false,
        level: LEVELS.NORMAL
    }

    

    const submit = (values) => {
        const newTask = new Task(
            values.name,
            values.description,
            false,
            values.level
        );
        add(newTask);
        alert('Task added')
    }

    return (
        <div>
            <h4 className='row-12'>Add tasks</h4>
            <Formik
                
                initialValues = {initialTaskValues}
                // *** Validacion de esquema con Yup***
                validationSchema = {taskSchema}
                // ** evento de submit
                onSubmit={async (values) => {
                    console.log("submit aqui")
                    await new Promise((r) => setTimeout(r, 200));                    
                    submit(values)
                }}
            >

                {({ values, errors, touched, isSubmitting}) => (
                    <Form className="d-flex row align-items-center justify-content-center form-outline flex-fill">
                        <div className='form-outline flex-fill'>
                            <label htmlFor="name">Name:</label>
                            <Field className='form-control form-control-sm' id="name" type="text" name="name" placeholder="Task Name" />
                            
                            {/* Name Errors */}
                            {
                                errors.name && touched.name && 
                                (
                                    <ErrorMessage name="name" component='div' style={{color: 'red'}}></ErrorMessage>
                                )
                            }

                            <label htmlFor="description">Description:</label>
                            <Field className='form-control form-control-sm' id="description" type="text" name="description" placeholder="Task Description" />

                            {/* Description Errors */}
                            {
                                errors.description && touched.description && 
                                (
                                    <ErrorMessage name="description" component='div' style={{color: 'red'}}></ErrorMessage>
                                )
                            }

                            <label for='level' htmlFor="level">Level: </label>
                            <Field className='form-control form-control-sm mb-3'
                                component="select"
                                id="level"
                                name="level"                                
                                multiple={false}       
                            >
                                <option value={LEVELS.NORMAL}>Normal</option>
                                <option value={LEVELS.URGENT}>Urgent</option>
                                <option value={LEVELS.BLOCKING}>Blocking</option>
                            </Field> 
                            <button className='btn btn-success btn-sm ms-2' type='submit'>Add task</button>
                            {isSubmitting ? (<p>Adding task...</p>): null}

                        </div>             

                    </Form>
                )}
            </Formik>            
        </div>
    );
}

export default TaskFormik;
