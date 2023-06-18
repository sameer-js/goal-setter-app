import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import GoalForm from "../components/GoalForm";
import { getGoals, reset } from "../features/goals/goalSlice";
import GoalItem from "../components/GoalItem";
import {toast} from 'react-toastify';
// import Spinner from "../components/Spinner";

function Dashboard() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {user} = useSelector((state) => state.auth)
  const { goals, isError, message } = useSelector((state) => state.goals) // Add isLoading for Spinner

  useEffect(() => {
    if (isError) {
      toast.error(message, {autoClose:2000})
    }

    if (!user) {
      navigate('/login')
    } else {
      dispatch(getGoals())
    }

    return () => {
      dispatch(reset());
    }

  }, [user, navigate, isError, message, dispatch])

  // if (isLoading) {
  //   return <Spinner />
  // }

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <p>Goals Dashboard</p>
      </section>
      
      <GoalForm />

      <section className="content">
        {goals.length > 0 ? (<div className="goals">
          {goals.map((goal) => (
            <GoalItem goal={goal} key={goal._id} />
          ))}

        </div>) : (<h3>You have not set any goals</h3>) }
      </section>
    </>
  )
}

export default Dashboard;