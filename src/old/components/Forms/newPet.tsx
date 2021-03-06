import React, { useEffect, useRef, useState } from "react";
import { SubmitHandler, FormHandles } from "@unform/core";
import { Form } from "@unform/web";
import { Input } from "./input";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router";
import API from "../../api";

interface IForm {
  id: string;
  name: string;
  birthDate?: string;
  breed?: string;
  weight?: number | string;
  weightUnity: string;
  imgURL: string;
  femaleOrMale: string;
  description?: string;
  haveMedicines: string;
  haveVaccines: string;
  created_at: string;
  owner?: string;
  label?: string;
}

const NewPet = ({ name, birthDate, ...rest }: IForm) => {
  const navigate = useNavigate();
  const formRef = useRef<FormHandles>(null);
  const [petData, setPetData] = useState<IForm>();
  const handleSubmit: SubmitHandler<FormData> = (data) => {
    const owner = { owner: "wes@wes.com" };
    const dataObject = { ...data, ...owner };
    setPetData(dataObject);
  };

  useEffect(() => {
    if (petData !== undefined) {
      API.post("/pets/", petData).then((response) => {
        navigate("/pets/");
      });
    } else {
      return;
    }
  }, [petData]);

  return (
    <div>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Input name="name" label="Pet name" />
        <Input name="imgURL" label="Upload a photo" />
        <Input name="birthDate" label="Pet birth date" />
        <Input name="breed" label="Pet breed" />
        <Input name="weight" label="Pet current weight" />
        <Input name="weightUnity" label="weight unity" />
        <Input name="femaleOrMale" label="Pet gender" />
        <Input name="description" label="Description" />
        <Input name="haveMedicines" label="Medicines" />
        <Input name="haveVaccines" label="Vaccines" />

        {/* <button type="submit" onClick={() => navigate("/pets/")}> */}
        <button type="submit">Save Pet</button>
      </Form>
    </div>
  );
};

export { NewPet };
