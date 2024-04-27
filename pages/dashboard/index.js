import connectToDB from "@/configs/db";
import UserModel from '@/models/User'
import { verifyToken } from "@/utils/auth";
import { redirect } from "next/dist/server/api-utils";
import React from "react";

function Dashboard({user}) {
  return (
    <>
      <h1>{user.firstname} - {user.lastname} - Welcome To Dashboard</h1>
    </>
  );
}

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
    "_id firstname lastname"
  )

  return {
    props: {
      user : JSON.parse(JSON.stringify(user))
    },
  }
}

export default Dashboard;
