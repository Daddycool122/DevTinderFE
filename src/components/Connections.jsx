import React, { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addConnections } from "../utils/connectionsSlice";
import { useDispatch, useSelector } from "react-redux";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);

  const getConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res.data.data);
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (!connections){
    getConnections();
    }
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <div>No Connections yet</div>;

  return (
    <div className="flex flex-col items-center px-4">
      <div className="font-bold text-3xl sm:text-4xl m-4 text-center">
        Connections
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 w-full max-w-6xl">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, about, gender, age } =
            connection;
          return (
            <ul
              key={index}
              className="list bg-base-300 rounded-xl shadow-md p-4 flex flex-col sm:flex-row items-center gap-4"
            >
              <li className="flex flex-col sm:flex-row items-center sm:items-start gap-4 w-full">
                <img
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full"
                  src={photoUrl}
                  alt={firstName}
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="font-semibold text-lg">
                    {firstName + " " + lastName}
                  </div>
                  <div className="text-sm text-gray-600 ">{about}</div>
                  {age && gender && (
                    <div className="text-xs uppercase font-semibold opacity-60 my-2">
                      {age + " " + gender}
                    </div>
                  )}
                </div>
                
              </li>
            </ul>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
