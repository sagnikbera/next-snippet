"use client"
import React from "react";

type errPgProp = {
    error : Error
}

const ErrorPage= ({error} : errPgProp) => {
  return <div>{error.message}</div>;
};

export default ErrorPage;
