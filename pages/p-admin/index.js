import React from "react";
import connectToDB from "@/configs/db";
import UserModel from '@/models/User'
import { verifyToken } from "@/utils/auth";
import { redirect } from "next/navigation";

function PAdmin({user}) {
  return <h1>Welcome To Admin Panel ❤️  {user.firstname}- {user.lastname}  </h1>;
}

// SSR protection(serverSide)

export async function getServerSideProps(context) {
  connectToDB();

  const { token } = context.req.cookies;

  if (!token) {
    return {
      redirect: {
        destination: '/signin',
      },
    }
  }

  const tokenPayload = verifyToken(token);
  console.log(tokenPayload);

  if (!tokenPayload) {
    return {
      redirect: {
        destination: '/signin',
      },
    }
  }

  const user = await UserModel.findOne(
    {
      email: tokenPayload.email,
    },
    "_id firstname lastname role"
  )

  if(user.role !== 'ADMIN'){
    return {
      redirect : {
        destination : "/dashboard"
      }
    }
  }

  return {
    props: {
      user : JSON.parse(JSON.stringify(user))
    },
  }
}


export default PAdmin;
