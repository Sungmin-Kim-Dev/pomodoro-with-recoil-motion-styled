import {motion} from "motion/react";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import styled from "styled-components";
import {goalNumber, isRunningState, minutesState, roundNumber, secondsState} from "./atoms";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: ${(props) => props.theme.bgColor};
  padding-top: 3rem;
  /* #9EDF9C */
`;

const Title = styled.h1`
  font-size: 5rem;
  font-weight: 800;
  text-align: center;
  margin-bottom: 2rem;
`;

const NumberWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10rem;
  font-weight: 800;
  margin-bottom: 2rem;
`;

const NumberBox = styled(motion.div)`
  width: 16rem;
  height: 20rem;
  color: ${(props) => props.theme.bgColor};
  background-color: ${(props) => props.theme.textColor};
  align-content: center;
  text-align: center;
  border-radius: 3rem;
`;
const numberBoxVariants = {
  start: {
    scale: 0.7,
  },
  end: {
    scale: 1,
    transition: {
      duration: 0.3,
    },
  },
};

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  column-gap: 5rem;
  margin-bottom: 2rem;
`;

const Button = styled(motion.button)`
  width: 6rem;
  height: 6rem;
`;
const buttonVariants = {
  hover: {
    scale: 1.3,
    transition: {
      duration: 0.3,
    },
  },
  click: {
    rotateZ: 360,
    transition: {
      duration: 0.5,
    },
  },
};

const RecordWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  column-gap: 5rem;
`;

const RecordBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: 800;
  gap: 0.5rem;
`;
const RecordNumber = styled.div`
  opacity: 0.8;
`;

function App() {
  const [minutes, setMinutes] = useRecoilState(minutesState);
  const [seconds, setSeconds] = useRecoilState(secondsState);
  const [isRunning, setIsRunning] = useRecoilState(isRunningState);
  const [currentRound, setCurrentRound] = useRecoilState(roundNumber);
  const [currentGoal, setCurrentGoal] = useRecoilState(goalNumber);

  useEffect(() => {
    let intervalId: number | undefined;
    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes((prevMinutes) => prevMinutes - 1);
            setSeconds(59);
          } else {
            setIsRunning(false); // Timer finished
            setCurrentRound((prevRound) => prevRound + 1);
            setMinutes(25);
          }
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, minutes, seconds, setMinutes, setSeconds, setIsRunning, setCurrentRound]);

  useEffect(() => {
    if (currentRound % 4 === 0 && currentRound !== 0) {
      setCurrentGoal((prevGoal) => prevGoal + 1);
    }
  }, [currentRound, setCurrentGoal]);

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(3);
  };

  return (
    <Container>
      <Title>Pomodoro</Title>
      <NumberWrapper>
        <NumberBox variants={numberBoxVariants} initial="start" animate="end" key={`m${minutes}`}>
          {minutes < 10 ? `0${minutes}` : minutes}
        </NumberBox>
        :
        <NumberBox variants={numberBoxVariants} initial="start" animate="end" key={`s${seconds}`}>
          {seconds < 10 ? `0${seconds}` : seconds}
        </NumberBox>
      </NumberWrapper>
      <ButtonWrapper>
        <Button onClick={() => setIsRunning(!isRunning)} variants={buttonVariants} whileHover="hover">
          {!isRunning ? (
            <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm6.39-2.908a.75.75 0 0 1 .766.027l3.5 2.25a.75.75 0 0 1 0 1.262l-3.5 2.25A.75.75 0 0 1 8 12.25v-4.5a.75.75 0 0 1 .39-.658Z"></path>
            </svg>
          ) : (
            <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                clipRule="evenodd"
                fillRule="evenodd"
                d="M2 10a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm5-2.25A.75.75 0 0 1 7.75 7h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Zm4 0a.75.75 0 0 1 .75-.75h.5a.75.75 0 0 1 .75.75v4.5a.75.75 0 0 1-.75.75h-.5a.75.75 0 0 1-.75-.75v-4.5Z"></path>
            </svg>
          )}
        </Button>
        <Button onClick={() => resetTimer()} variants={buttonVariants} whileHover="hover" whileTap="click">
          <svg data-slot="icon" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z"></path>
          </svg>
        </Button>
      </ButtonWrapper>
      <RecordWrapper>
        <RecordBox>
          <RecordNumber>{currentRound % 4}/4</RecordNumber>
          <p>Round</p>
        </RecordBox>
        <RecordBox>
          <RecordNumber>{currentGoal}/12</RecordNumber>
          <p>Goal</p>
        </RecordBox>
      </RecordWrapper>
    </Container>
  );
}

export default App;
