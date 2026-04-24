-- name: get_cluster_info
SELECT cluster_number, title, topic_list FROM practice_clusters;

-- name: get_cluster_by_number
SELECT * FROM practice_clusters WHERE cluster_number = $1;