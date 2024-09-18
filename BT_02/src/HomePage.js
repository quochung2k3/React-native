import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, Button, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation(); // Dùng để điều hướng

  // Gọi API khi component được mount
  useEffect(() => {
    fetchPosts(); // Gọi API để lấy dữ liệu ban đầu
  }, []);

  // Hàm lấy dữ liệu từ API (có thể dùng cho việc tìm kiếm và lọc)
  const fetchPosts = async (query = '') => {
    try {
      const url = query
        ? `http://172.27.160.1:4000/api/post/search?postId=${query}` // Gọi API với từ khóa
        : 'http://172.27.160.1:4000/api/post/search'; // Gọi API mà không có từ khóa để lấy tất cả bài viết

      const response = await fetch(url);
      const data = await response.json();

      if (data.length > 0) {
        setPosts(data); // Trực tiếp lưu dữ liệu vào state
      } else {
        setPosts([]); // Trả về mảng rỗng nếu không có bài viết
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  // Hàm xử lý tìm kiếm, gọi lại API với từ khóa tìm kiếm
  const handleSearch = (query) => {
    setSearchQuery(query);
    fetchPosts(query); // Gọi API với từ khóa tìm kiếm
  };

  // Hàm chuyển hướng đến trang chi tiết bài viết
  const goToPostDetail = (postId) => {
    navigation.navigate('PostDetail', { postId }); // Chuyển hướng đến trang chi tiết và truyền postId
  };

  return (
    <View style={{ flex: 1, padding: 16 }}>
      {/* Input cho việc tìm kiếm */}
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
          marginBottom: 16,
          paddingLeft: 8,
        }}
        placeholder="Search posts..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 16 }}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <TouchableOpacity key={post._id} onPress={() => goToPostDetail(post._id)}>
              <View
                style={{
                  backgroundColor: 'white',
                  padding: 16,
                  marginBottom: 16,
                  borderRadius: 8,
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                }}
              >
                <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 8 }}>
                  {post.title}
                </Text>
                <Text style={{ color: 'gray', marginBottom: 8 }}>{post.content}</Text>

                {post.images && post.images.length > 0 ? (
                  <Image
                    source={{ uri: post.images[0] }}
                    style={{
                      width: '100%',
                      height: 200,
                      resizeMode: 'cover',
                      marginBottom: 8,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      width: '100%',
                      height: 200,
                      backgroundColor: '#f0f0f0',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <Text>No image available</Text>
                  </View>
                )}

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 }}>
                  <Button title="Like" color="#1e90ff" />
                  <Button title="Comment" color="#32cd32" />
                  <Button title="Share" color="#8a2be2" />
                </View>
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No posts available</Text>
        )}
      </ScrollView>
    </View>
  );
};

export default HomePage;