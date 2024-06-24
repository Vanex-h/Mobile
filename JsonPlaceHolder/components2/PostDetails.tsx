import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { getPost } from '../services/api';

interface Post {
  id: string;
  title: string;
  body: string;
  Comments?: Comment[];
}

interface Comment {
  id: string;
  body: string;
}

interface PostDetailsProps {
  postId: string;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ postId }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    fetchPost();
  }, [postId]);

  const fetchPost = async () => {
    try {
      const response = await getPost(postId);
      setPost(response.data);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch post details');
    }
  };

  if (!post) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <Text style={styles.commentsHeader}>Comments:</Text>
      {post.Comments && post.Comments.map((comment) => (
        <View key={comment.id} style={styles.comment}>
          <Text>{comment.body}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  body: {
    fontSize: 16,
    marginBottom: 16,
  },
  commentsHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
  },
  comment: {
    marginBottom: 8,
  },
});