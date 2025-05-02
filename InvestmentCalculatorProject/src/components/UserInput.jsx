import React from 'react';

export default function UserInput({ userInput, onChange }) {
  return (
    <section id='user-input'>
      <div className='input-group'>
        <p>
          <label>Initial Investment</label>
          <input
            name='initialInvestment'
            type='number'
            required
            value={userInput.initialInvestment}
            onChange={onChange}
          />
        </p>
        <p>
          <label>Annual Investment</label>
          <input
            name='annualInvestment'
            type='number'
            required
            value={userInput.annualInvestment}
            onChange={onChange}
          />
        </p>
      </div>
      <div className='input-group'>
        <p>
          <label>Expected Return</label>
          <input
            name='expectedReturn'
            type='number'
            required
            step={0.1}
            value={userInput.expectedReturn}
            onChange={onChange}
          />
        </p>
        <p>
          <label>
            {userInput.duration <= 1 ? 'Duration (year)' : 'Duration (years)'}
          </label>
          <input
            name='duration'
            type='number'
            required
            value={userInput.duration}
            onChange={onChange}
          />
        </p>
      </div>
    </section>
  );
}
