import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  StyleSheet,
} from 'react-native';
import { useFocusEffect } from 'expo-router';

export default function ChatScreen() {
  const [messages, setMessages] = useState<{ text: string; sender: 'user' | 'bot' }[]>([]);
  const [input, setInput] = useState('');
  const flatListRef = useRef<FlatList>(null);

  // Clear conversation when leaving the screen
  useFocusEffect(
    React.useCallback(() => {
      return () => setMessages([]);
    }, [])
  );

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=API_KEY',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: input }] }],
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      const botReply =
        data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not understand that.';
      setMessages((prev) => [...prev, { text: botReply, sender: 'bot' }]);
      flatListRef.current?.scrollToEnd({ animated: true });
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { text: 'Error fetching response.', sender: 'bot' }]);
    }
  };

  const renderItem = ({ item }: { item: { text: string; sender: 'user' | 'bot' } }) => (
    <View
      style={[
        styles.messageBubble,
        item.sender === 'user' ? styles.userBubble : styles.botBubble,
      ]}
    >
      <Text style={[styles.messageText, { color: '#fff' }]}>{item.text}</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.messagesContainer}
      />

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={input}
          onChangeText={setInput}
          placeholder="Type your message..."
          placeholderTextColor="#999"
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>Send</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  messagesContainer: {
    padding: 16,
    paddingBottom: 80,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
  },
  userBubble: {
    backgroundColor: '#1E90FF',
    alignSelf: 'flex-end',
  },
  botBubble: {
    backgroundColor: '#1E90FF', // Bot reply is also blue now
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#1E90FF',
    paddingHorizontal: 20,
    justifyContent: 'center',
    marginLeft: 10,
    borderRadius: 25,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
