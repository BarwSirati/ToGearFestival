import React from "react";
import Textarea from "../components/Textarea";
import Input from "../components/Input";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { sendInitiate } from "../redux/action";
import { useNavigate } from "react-router-dom";
const Form = ({ email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const schema = yup
    .object()
    .shape({
      name: yup.string().required(),
      content: yup.string().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
    dispatch(sendInitiate(email, data.name, data.content));
    navigate("/wait", { replace: true });
  };
  return (
    <div className="md:p-10 p-5 w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-black text-3xl text-center">ข้อความ</h1>
        <div className="text-black text-xl mt-8">
          <div className="form-control">
            <Input
              type="text"
              placeholder="นามแฝง"
              register={register("name")}
              className={`${errors.name && "border-red-600 border-8"}`}
            />
          </div>
          <div className="form-control my-8">
            <Textarea
              placeholder="ข้อความ"
              register={register("content")}
              className={`${errors.content && "border-red-600 border-8"}`}
            />
          </div>
        </div>
        <div className="mx-auto w-full">
          <button className="btn btn-info text-white font-weight w-full rounded shadow-xl">
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
