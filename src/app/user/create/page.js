
'use client'

import {useForm} from "react-hook-form";
import {Button, Col, Row} from "reactstrap";
import {post} from "@/core/httpClient";
import {useTestActions} from "@/context/textContext";
import testAction from "@/core/testAction";



export default function UserCreate() {
    const {
        register,
        watch,
        handleSubmit,
        formState: {errors}
    } = useForm({
        mode: "onSubmit",
    });


    const {state, dispatch} = useTestActions();

    return (
        <>
            <Row className="mb-3">
                <Col md={6}>
                    <input type="text" className="form-control" placeholder="First name..." {...register("firstName", {
                        required: "First name is required",
                        maxLength: 50,
                        minLength: 3,

                    })}/>
                    {errors && errors.firstName &&(
                        <span className="text-danger">{errors.firstName.message}</span>
                    )}
                </Col>

                <Col md={6}>
                    <input type="text" className="form-control" placeholder="Last name..."{...register("lastName", {
                        required: "Last name is required",
                    })}/>
                    {errors && errors.lastName &&(
                        <span className="text-danger">{errors.lastName.message}</span>
                    )}
                </Col>
            </Row>

            <Row className="mb-3">
                <Col md={6}>
                    <input type="text" className="form-control" placeholder="Email..." {...register("email", {
                        required: "Email is required",

                    })}/>
                    {errors && errors.email &&(
                        <span className="text-danger">{errors.email.message}</span>
                    )}
                </Col>

                <Col md={6}>
                    <input type="text" className="form-control" placeholder="Contact number..."{...register("contactNumber", {
                        required: "Contact number is required",
                        maxLength: 14,
                        minLength: 8,
                        validate: (value) => {
                            if (!/^[0-9]+$/.test(value)){
                                return "You can enter only numbers"
                            }
                            return /^[0-9]+$/.test(value);
                        }
                    })}/>
                    {errors && errors.contactNumber &&(
                        <span className="text-danger">{errors.contactNumber.message}</span>
                    )}
                </Col>
            </Row>

            <Row>
                <Col md="12" className="d-flex justify-content-end">
                    <Button className="btn btn-primary" type="button" onClick={() => {
                        handleSubmit(async (data) => {
                            await post("/user/create", data);
                        })();
                    }}>
                        Submit
                    </Button>
                </Col>
            </Row>
        </>
    );

}