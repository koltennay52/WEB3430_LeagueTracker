import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

export function VHelp({ message }) {
    return <p className="help">{ message }</p>
  }
  
export function Register(props) {

    const validationSchema = yup.object({
        summonerName: yup.string().required(),
        email: yup.string().required(), 
        password: yup.string().required()
    });

    let { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            summonerName: "",
            email: "",
            password: ""
        },
        validationSchema,
        onSubmit(values) {
            fetch('/api/v1/users/register', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "same-origin",
              body: JSON.stringify(values)
            }).then((response) => {
              if(!response.ok) throw Error('Failed to sign up')
              return response.text()
            }).then(() => {
              toast('Successfully signed up', {
                onClose: () => {
                  document.location = "/login"
                }
              })
            }).catch((error) => {
              toast('Failed to sign up', {
                onClose: () => {
                  document.location = "/register"
                }
              })
            })
          }
    })

    return (
        <form className="text-center p-5" action="#!">
            <h2 className="mb-4">Summoner Registration</h2>
            
            <div className="control">
                <input
                    type="text"
                    className="form-control mb-4  input-shadow"
                    placeholder="Summoner Name"
                    value={values.summonerName}
                    onChange={handleChange}
                    name="summonerName"
                />
                <VHelp message={errors.summonerName} />
            </div>
            
            <div className="control">
                <input
                    type="text"
                    className="form-control mb-4 input-shadow"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    name="email"
                />
                <VHelp message={errors.email} />
            </div>
            
            <div className="control">
                <input
                    type="password"
                    className="form-control mb-4 input-shadow"
                    placeholder="Password"
                    value={values.password}
                    onChange={handleChange}
                    name="password"
                />
                <VHelp message={errors.password} />
            </div>
            

            <button className="btn btn-primary my-4" type="submit" onClick={handleSubmit}>
                Register
            </button>

            <p className="">
                Already a user? <a className="" href="/login"> Login</a>
            </p>
        </form>
    )
}