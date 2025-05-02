import { useState } from 'react';
import { EXAMPLES } from '../data';
import TabButton from './TabButton';
import Section from './Section';
import Tabs from './Tabs';

export default function Examples() {
  const [selectedTopic, setSelectedTopic] = useState();
  const tabButtons = Object.keys(EXAMPLES);

  let tabContent = <p>Please select a topic.</p>;
  if (selectedTopic) {
    const { title, description, code } = EXAMPLES[selectedTopic];
    tabContent = (
      <div id='tab-content'>
        <h3>{title}</h3>
        <p>{description}</p>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    );
  }

  function handleClick(selectedButton) {
    console.log(`Examples --> ${selectedButton.toLowerCase()} selected!`);
    setSelectedTopic(selectedButton);
  }

  return (
    <Section id='examples' title='Examples'>
      <Tabs
        buttonsContainer='menu'
        buttons={
          <>
            {tabButtons.map((title, i) => (
              <TabButton
                key={i}
                onClick={() => handleClick(title)}
                isSelected={selectedTopic === title}
              >
                {title}
              </TabButton>
            ))}
          </>
        }
      >
        {tabContent}
      </Tabs>
    </Section>
  );
}
