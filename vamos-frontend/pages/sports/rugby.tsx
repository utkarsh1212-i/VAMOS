import router from 'next/router'
import React from 'react'
import styles from '../../styles/sports.module.css';

function Rugby() {
  return (
    <div>Rugby
      <button 
        className={styles.chatButton}
        onClick={() => router.push('/rooms')}
      >
        Go to Chat
      </button>
    </div>
  )
}

export default Rugby