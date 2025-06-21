import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './quiz.css';

const Quiz = () => {
  const { testId } = useParams();
  const navigate = useNavigate();
  
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [results, setResults] = useState({ correct: 0, total: 0 });
  const [showFeedback, setShowFeedback] = useState(false);
  const [showResults, setShowResults] = useState(false); 
  
  const timerRef = useRef(null);

  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // Загрузка вопросов
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await axios.get(`http://192.168.0.125:8080/chapter/${testId}`);
        
        if (!response.data || !Array.isArray(response.data)) {
          throw new Error("Некорректный формат данных");
        }
        
        setQuestions(response.data);
        setResults({ 
          correct: 0, 
          total: response.data.length,
          answered: 0 
        });
        setLoading(false);
      } catch (err) {
        console.error("Ошибка загрузки вопросов:", err);
        setError(`Ошибка загрузки теста: ${err.message}`);
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [testId]);

  // Обработка выбора ответа
  const handleAnswerSelect = (option) => {
    if (isAnswered) return;
    
    setSelectedAnswer(option);
    
    // Проверяем ответ
    const correct = option === questions[currentQuestionIndex].answer;
    setIsCorrect(correct);
    setIsAnswered(true);
    setShowFeedback(true);
    
    // Обновляем результаты
    setResults(prev => ({
      ...prev,
      correct: correct ? prev.correct + 1 : prev.correct,
      answered: prev.answered + 1
    }));
    
    // Устанавливаем таймер для перехода к следующему вопросу
    timerRef.current = setTimeout(() => {
      setShowFeedback(false);
      
      // Проверяем, является ли текущий вопрос последним
      const isLastQuestion = currentQuestionIndex === questions.length - 1;
      
      if (isLastQuestion) {
        // Для последнего вопроса показываем результаты
        setShowResults(true);
      } else {
        // Переходим к следующему вопросу
        goToNextQuestion();
      }
    }, 2000); // 2 секунды задержки
  };

  // Переход к следующему вопросу
  const goToNextQuestion = () => {
    setCurrentQuestionIndex(prev => prev + 1);
    resetQuestionState();
  };

  // Сброс состояния вопроса
  const resetQuestionState = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    setIsCorrect(null);
  };

  // Сброс всего теста
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    resetQuestionState();
    setResults({ 
      correct: 0, 
      total: questions.length,
      answered: 0 
    });
    setShowResults(false);
  };

  // Возврат в главное меню
  const goToMainMenu = () => {
    navigate('/');
  };

  if (loading) return <div className="quiz-container">Загрузка вопросов...</div>;
  if (error) return <div className="quiz-container error">{error}</div>;
  if (!questions.length) return <div className="quiz-container">Вопросы не найдены</div>;
  
  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Тест: Глава {testId}</h1>
      
      {/* Прогресс-бар */}
      <div className="progress-bar">
        <div 
          className="progress-fill"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        ></div>
        <div className="progress-text">
          Вопрос {currentQuestionIndex + 1} из {questions.length}
        </div>
      </div>
      
      {/* Статистика правильных ответов */}
      <div className="current-stats">
        Правильных ответов: {results.correct} / {results.answered}
      </div>
      
      {/* Блок вопроса (скрывается на последнем вопросе после ответа) */}
      {!showResults && (
        <div className="question-card">
          <div className="question-header">
            <h2 className="question-id">{currentQuestion.id} {currentQuestion.text}</h2>
          </div>
          
          <div className="options">
            {currentQuestion.options.map((option, index) => {
              const isSelected = selectedAnswer === option;
              const isActualAnswer = option === currentQuestion.answer;
              let optionClass = 'option';
              
              if (isAnswered) {
                if (isActualAnswer) {
                  optionClass += ' correct';
                } else if (isSelected && !isActualAnswer) {
                  optionClass += ' incorrect';
                }
              } else if (isSelected) {
                optionClass += ' selected';
              }
              
              return (
                <div 
                  key={index}
                  className={optionClass}
                  onClick={() => handleAnswerSelect(option)}
                >
                  {option}
                </div>
              );
            })}
          </div>
         
         {/* Блок обратной связи */}
          {/* 
          {showFeedback && (
            <div className={`feedback ${isCorrect ? 'correct-feedback' : 'incorrect-feedback'}`}>
              {isCorrect ? (
                <div className="feedback-content">
                  <span className="feedback-icon">✓</span>
                  <span className="feedback-text">Верно!</span>
                </div>
              ) : (
                <div className="feedback-content">
                  <span className="feedback-icon">✗</span>
                  <span className="feedback-text">
                    Неверно! Правильный ответ: {currentQuestion.answer}
                  </span>
                </div>
              )}
            </div>
          )} */}
        </div>
      )}
      
      {/* Блок результатов (отображается после последнего вопроса) */}
      {showResults && (
        <div className="results-card">
          <h2 className="results-title">Тест завершен!</h2>
          
          <div className="results-stats">
            <div className="stat-item">
              <div className="stat-value">{results.correct}</div>
              <div className="stat-label">Правильных ответов</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">{results.total - results.correct}</div>
              <div className="stat-label">Ошибок</div>
            </div>
            
            <div className="stat-item">
              <div className="stat-value">
                {Math.round((results.correct / results.total) * 100)}%
              </div>
              <div className="stat-label">Успешность</div>
            </div>
          </div>
          
          <div className="results-actions">
            <button onClick={resetQuiz} className="retry-btn">
              Пройти тест заново
            </button>
            <button onClick={goToMainMenu} className="main-menu-btn">
              Вернуться в меню
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Quiz;