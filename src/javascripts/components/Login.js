import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function VHelp({ message }) {
    return <p className="help">{ message }</p>
  }
  
export function Login(props) {

    const validationSchema = yup.object({
        summonerName: yup.string().required(),
        password: yup.string().required()
    });

    let { handleSubmit, handleChange, values, errors } = useFormik({
        initialValues: {
            summonerName: "",
            password: ""
        },
        validationSchema,
        onSubmit(values) {
            fetch('/api/v1/users/signin', {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              credentials: "same-origin",
              body: JSON.stringify(values)
            }).then((response) => {
              if(!response.ok) throw Error('Failed to sign in')
              return response.text()
            }).then(() => {
              toast('Successfully signed in', {
                onClose: () => {
                  document.location = "/"
                }
              })
            }).catch((error) => {
              toast('Failed to sign in', {
                onClose: () => {
                  document.location = "/login"
                }
              })
            })
          }
    })

    return (
        <form className="text-center p-5" action="#!">
            <h2 className="mb-4">Welcome to Kolten's League Tracker</h2>
            
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
                Sign In
            </button>

            <p className="">
                Need an account? <a className="" href="/register"> Register</a>
            </p>
        </form>
    )
}