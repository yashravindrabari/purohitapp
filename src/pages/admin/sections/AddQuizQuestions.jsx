"use client"

import { useState } from "react"

const AddQuizQuestions = () => {
  const [formData, setFormData] = useState({
    question: "",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correctAnswer: "",
    category: "",
    difficulty: "",
    explanation: "",
  })

  const [questions, setQuestions] = useState([
    {
      id: 1,
      question: "Which festival is known as the Festival of Lights?",
      options: ["Holi", "Diwali", "Dussehra", "Navratri"],
      correctAnswer: "Diwali",
      category: "Festivals",
      difficulty: "Easy",
      status: "Active",
    },
    {
      id: 2,
      question: "Who is known as the destroyer in the Hindu Trinity?",
      options: ["Brahma", "Vishnu", "Shiva", "Indra"],
      correctAnswer: "Shiva",
      category: "Mythology",
      difficulty: "Medium",
      status: "Active",
    },
  ])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const newQuestion = {
      id: questions.length + 1,
      question: formData.question,
      options: [formData.option1, formData.option2, formData.option3, formData.option4],
      correctAnswer: formData.correctAnswer,
      category: formData.category,
      difficulty: formData.difficulty,
      status: "Active",
    }
    setQuestions([...questions, newQuestion])
    setFormData({
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      category: "",
      difficulty: "",
      explanation: "",
    })
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Quiz Questions</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Add Question Form */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add New Question</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Question *</label>
                <textarea
                  name="question"
                  value={formData.question}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Option 1 *</label>
                  <input
                    type="text"
                    name="option1"
                    value={formData.option1}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Option 2 *</label>
                  <input
                    type="text"
                    name="option2"
                    value={formData.option2}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Option 3 *</label>
                  <input
                    type="text"
                    name="option3"
                    value={formData.option3}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Option 4 *</label>
                  <input
                    type="text"
                    name="option4"
                    value={formData.option4}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Correct Answer *</label>
                  <select
                    name="correctAnswer"
                    value={formData.correctAnswer}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select Answer</option>
                    <option value={formData.option1}>{formData.option1}</option>
                    <option value={formData.option2}>{formData.option2}</option>
                    <option value={formData.option3}>{formData.option3}</option>
                    <option value={formData.option4}>{formData.option4}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Festivals">Festivals</option>
                    <option value="Mythology">Mythology</option>
                    <option value="Scriptures">Scriptures</option>
                    <option value="Rituals">Rituals</option>
                    <option value="General">General</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Difficulty *</label>
                  <select
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                    required
                  >
                    <option value="">Select Difficulty</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Explanation (Optional)</label>
                <textarea
                  name="explanation"
                  value={formData.explanation}
                  onChange={handleInputChange}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors duration-200"
              >
                Add Question
              </button>
            </form>
          </div>

          {/* Questions List */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Questions</h2>

            <div className="space-y-4">
              {questions.map((question) => (
                <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-sm font-medium text-gray-900">{question.question}</h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        question.difficulty === "Easy"
                          ? "bg-green-100 text-green-800"
                          : question.difficulty === "Medium"
                            ? "bg-yellow-100 text-yellow-800"
                            : "bg-red-100 text-red-800"
                      }`}
                    >
                      {question.difficulty}
                    </span>
                  </div>

                  <div className="text-xs text-gray-500 mb-2">
                    Category: {question.category} | Correct Answer: {question.correctAnswer}
                  </div>

                  <div className="flex space-x-2">
                    <button className="px-3 py-1 text-xs bg-orange-500 text-white rounded hover:bg-orange-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 text-xs border border-gray-300 text-gray-700 rounded hover:bg-gray-50">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddQuizQuestions
