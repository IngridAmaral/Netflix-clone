import React from 'react';
import './Question.css';

const questions = [
  {
    question: 'What can i watch on Netflix?',
    answer: [
      'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want. Join free for 30 days to see everything Netflix has to offer.',
    ],
  },
  {
    question: 'What is Netflix?',
    answer: [
      [
        'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
      ],
      [
        "You can watch as much as you want, whenever you want without a single commercial – all for one low monthly price. There's always something new to discover and new TV shows and movies are added every week!",
      ],
    ],
  },
  {
    question: 'How much does Netflix cost?',
    answer: [
      'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one low fixed monthly fee. Plans start from €7,99 a month. No extra costs or contracts.',
    ],
  },
  {
    question: 'Where can i watch?',
    answer: [
      [
        'Watch anywhere, anytime, on an unlimited number of devices. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.',
      ],
      [
        "You can also download your favorite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you're on the go and without an internet connection. Take Netflix with you anywhere.",
      ],
    ],
  },
  {
    question: 'How do i cancel?',
    answer: [
      'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.',
    ],
  },
  {
    question: 'How does the free trial works?',
    answer: [
      'Try us free for 30 days! If you enjoy your Netflix trial, do nothing and your membership will automatically continue for as long as you choose to remain a member. Cancel anytime before your trial ends and you won’t be charged. There’s no complicated contract, no cancellation fees, and no commitment. Cancel online anytime, 24 hours a day.',
    ],
  },
];

class Question extends React.Component {
  state = {
    clicked: false,
    number: null,
  }

  handleClick = (target) => {
    const { number } = this.state;

    if (target === number) {
      this.setState((state) => ({ clicked: !state.clicked, number: target }));
    } else {
      this.setState({ clicked: true, number: target });
    }
  };

  render() {
    return (
      <div className="question_container">
        {questions.map((question, idx) => {
          const { clicked, number } = this.state;

          const visibilityShow = clicked && number === idx ? 'show' : 'close';
          const close = clicked && number === idx ? 'rotate(-45deg)' : '';

          return (
            <div key={question.question} className="question_each_container">
              <button
                type="button"
                id={idx}
                onClick={() => this.handleClick(idx)}
                className="question_title"
              >
                <h2>{question.question}</h2>
                <p style={{ transform: close }}>+</p>
              </button>

              <div className={`answer ${visibilityShow}`}>
                {question.answer.length > 1 ? (
                  <div>
                    <p>{question.answer[0]}</p>
                    <p>{question.answer[1]}</p>
                  </div>
                ) : (
                  <p>{question.answer[0]}</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default Question;
