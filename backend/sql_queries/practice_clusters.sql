-- name: get_cluster_info
SELECT
    cluster_number,
    title, topic_list,
    SUM(CASE
      WHEN sec->'section_content'->>'question_type' = 'multiple-choice' THEN 1
      ELSE 0
    END) AS multiple_choice_count,
    SUM(CASE
      WHEN sec->'section_content'->>'question_type' = 'constructed-response' THEN 1
      ELSE 0
    END) AS constructed_response_count
FROM practice_clusters, jsonb_array_elements(cluster_sections) AS sec
WHERE sec->>'section_type' = 'question'
GROUP BY cluster_number
ORDER BY cluster_number

-- name: get_cluster_by_number
SELECT * FROM practice_clusters WHERE cluster_number = $1;
