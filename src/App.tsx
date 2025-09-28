import { useState } from 'react'
import css from './App.module.css'
import CafeInfo from './components/CafeInfo/CafeInfo'
import type { Votes, VoteType } from './types/votes'
import VoteOptions from './components/VoteOptions/VoteOptions'
import VoteStats from './components/VoteStats/VoteStats'
import Notification from './components/Notification/Notification'

export default function App() {

  // States
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 })

  // Functions
  function handleVote(type: VoteType) {
    if (type === 'bad') {
      setVotes({ ...votes, bad: votes.bad + 1 });
    } else if (type === 'good') {
      setVotes({...votes, good: votes.good + 1})
    } else if (type === 'neutral') {
      setVotes({...votes, neutral: votes.neutral + 1})
    }

  }

  function resetVotes() {
    setVotes({ good: 0, neutral: 0, bad: 0 })
  }

  // Computations
  const totalVotes = votes.good + votes.neutral + votes.bad
  const positiveRate = totalVotes
    ? Math.round((votes.good / totalVotes) * 100)
    : 0

  // JSX
  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions onVote={handleVote} onReset={resetVotes} canReset={totalVotes === 0 ? false : true} />
      {totalVotes === 0 ? <Notification /> : <VoteStats votes={votes} totalVotes={totalVotes} positiveRate={positiveRate} />}
    </div>
  )
}
