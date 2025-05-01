import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const quizQuestions = [
	{
		question: "React Native কি উদ্দেশ্যে ব্যবহৃত হয়?",
		options: ["ওয়েব অ্যাপ্লিকেশন", "মোবাইল অ্যাপ্লিকেশন", "ডেস্কটপ অ্যাপ্লিকেশন", "সার্ভার সাইড অ্যাপ্লিকেশন"],
		correctAnswer: "মোবাইল অ্যাপ্লিকেশন",
	},
	{
		question: "React Native কে উন্নত করেছে?",
		options: ["গুগল", "ফেসবুক", "মাইক্রোসফট", "এপল"],
		correctAnswer: "ফেসবুক",
	},
	{
		question: "React Native কোন JavaScript লাইব্রেরির উপর নির্ভর করে?",
		options: ["Angular", "Vue", "Svelte", "React"],
		correctAnswer: "React",
	},
	{
		question: "Expo কী?",
		options: ["একটি UI লাইব্রেরি", "একটি টুলচেইন", "একটি API", "একটি ডাটাবেজ"],
		correctAnswer: "একটি টুলচেইন",
	},
	{
		question: "React Native কোন ভাষায় লিখিত?",
		options: ["C#", "JavaScript", "Swift", "Kotlin"],
		correctAnswer: "JavaScript",
	},
	{
		question: "React Native কোন ধরনের অপারেটিং সিস্টেমের সাথে সামঞ্জস্যপূর্ণ?",
		options: ["অ্যান্ড্রয়েড এবং আইওএস", "আইওএস", "উইন্ডোজ", "ম্যাকOS"],
		correctAnswer: "অ্যান্ড্রয়েড এবং আইওএস",
	},
];

export default function App() {

	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
	const [selectedAnswer, setSelectedAnswer] = useState(null);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
	const [isQuizFinished, setIsQuizFinished] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState(0);

	const handleAnswer = (selectedOption) => {
		if (selectedOption === quizQuestions[currentQuestionIndex].correctAnswer) {
			setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
		}
		setSelectedAnswer(selectedOption);
		setShowCorrectAnswer(true);
	};

	const handleNext = () => {
		setShowCorrectAnswer(false);
		setSelectedAnswer(null);
		const nextQuestionIndex = currentQuestionIndex + 1;
		if (nextQuestionIndex < quizQuestions.length) {
			setCurrentQuestionIndex(nextQuestionIndex);
		} else {
			setIsQuizFinished(true);
		}
	};

	const restartQuiz = () => {
		setCurrentQuestionIndex(0);
		setSelectedAnswer(null);
		setShowCorrectAnswer(false);
		setIsQuizFinished(false);
		setCorrectAnswers(0);
	};

	return (
		<View style={styles.container}>
			{!isQuizFinished ? (
				<>
					<Text style={styles.questionCounter}>
						প্রশ্ন {currentQuestionIndex + 1} / {quizQuestions.length}
					</Text>
					<View style={styles.questionContainer}>
						<Text style={styles.questionText}>
							{quizQuestions[currentQuestionIndex].question}
						</Text>
						{quizQuestions[currentQuestionIndex].options.map((option, index) => (
							<TouchableOpacity
								key={index}
								style={
									showCorrectAnswer
										? option === quizQuestions[currentQuestionIndex].correctAnswer
											? [styles.optionButton, styles.correctOption]
											: option === selectedAnswer
												? [styles.optionButton, styles.wrongOption]
												: styles.optionButton
										: styles.optionButton
								}
								onPress={() => handleAnswer(option)}
								disabled={showCorrectAnswer}
							>
								<Text style={styles.optionText}>{option}</Text>
							</TouchableOpacity>
						))}
						{showCorrectAnswer && (
							<Text style={styles.correctAnswerText}>
								সঠিক উত্তর: {quizQuestions[currentQuestionIndex].correctAnswer}
							</Text>
						)}
					</View>
					{showCorrectAnswer && (
						<TouchableOpacity style={styles.nextButton} onPress={handleNext}>
							<Text style={styles.nextButtonText}>পরবর্তী প্রশ্ন</Text>
						</TouchableOpacity>
					)}
				</>
			) : (
				<>
					<Text style={styles.resultText}>কুইজ শেষ!</Text>
					<Text style={styles.resultDetails}>
						সঠিক উত্তর: {correctAnswers} / {quizQuestions.length}
					</Text>
					<TouchableOpacity style={styles.restartButton} onPress={restartQuiz}>
						<Text style={styles.restartButtonText}>পুনরায় শুরু করুন</Text>
					</TouchableOpacity>
				</>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		padding: 16,
		backgroundColor: "#f5f5f5",
	},
	questionCounter: {
		fontSize: 25,
		fontWeight: "bold",
		marginBottom: 20,
	},
	questionContainer: {
		alignItems: "center",
		width: "100%",
		backgroundColor: "#fff",
		padding: 20,
		borderRadius: 10,
		shadowColor: "#000",
		shadowOpacity: 0.8,
		shadowRadius: 6,
		elevation: 5,
	},
	questionText: {
		fontSize: 22,
		fontWeight: "bold",
		marginBottom: 15,
		textAlign: "center",
	},
	optionButton: {
		backgroundColor: "#6200ea",
		padding: 15,
		marginVertical: 5,
		width: "100%",
		borderRadius: 5,
		alignItems: "center",
	},
	optionText: {
		color: "#fff",
		fontSize: 16,
		textAlign: "center",
	},
	correctOption: {
		backgroundColor: "green",
	},
	wrongOption: {
		backgroundColor: "red",
	},
	correctAnswerText: {
		marginTop: 15,
		fontSize: 16,
		fontWeight: "bold",
		color: "green",
		textAlign: "center",
	},
	nextButton: {
		marginTop: 20,
		backgroundColor: "#007bff",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
	nextButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	resultText: {
		fontSize: 24,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	resultDetails: {
		fontSize: 18,
		fontWeight: "bold",
		marginBottom: 20,
		textAlign: "center",
	},
	restartButton: {
		backgroundColor: "#28a745",
		padding: 15,
		borderRadius: 5,
		alignItems: "center",
	},
	restartButtonText: {
		color: "#fff",
		fontSize: 16,
	},
});
