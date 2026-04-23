-- name: get_question_counts
SELECT topic, COUNT(*) FROM general_review GROUP BY topic ORDER BY topic;

-- name: get_question_by_topic_and_number
SELECT * FROM general_review WHERE topic = $1 AND question_number = $2;