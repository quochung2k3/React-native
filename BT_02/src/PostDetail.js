import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

const PostDetail = ({ route }) => {
  const { postId } = route.params; // Nhận postId từ route
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetchPostDetail();
  }, []);

  const fetchPostDetail = async () => {
    try {
      const response = await fetch(`http://172.27.160.1:4000/api/post/search?postId=${postId}`);
      const data = await response.json();
      setPost(data[0]);
    } catch (error) {
      console.error('Error fetching post detail:', error);
    }
  };

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.content}>{post.content}</Text>

      {post.images && post.images.length > 0 ? (
        <Image
          source={{ uri: post.images[0] }}
          style={styles.image}
        />
      ) : (
        <View style={styles.noImageContainer}>
          <Text>No image available</Text>
        </View>
      )}

      {/* Các nút Like, Comment, Share */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.likeButton]}>
          <Text style={styles.buttonText}>LIKE</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.commentButton]}>
          <Text style={styles.buttonText}>COMMENT</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.shareButton]}>
          <Text style={styles.buttonText}>SHARE</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  content: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
  },
  noImageContainer: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 5,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  likeButton: {
    backgroundColor: '#1e90ff', // Màu xanh cho nút LIKE
  },
  commentButton: {
    backgroundColor: '#32cd32', // Màu xanh lá cho nút COMMENT
  },
  shareButton: {
    backgroundColor: '#8a2be2', // Màu tím cho nút SHARE
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default PostDetail;