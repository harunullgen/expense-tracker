import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface Props {
  label: string;
  selected: boolean;
  onPress: () => void;
}

export default function FilterChip({
  label,
  selected,
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={[styles.chip, selected && styles.selected]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    backgroundColor: '#ECEEF3',
    borderRadius: 22,
    marginRight: 10,
  },
  selected: {
    backgroundColor: '#5B67F1',
  },
  text: {
    color: '#656570',
    fontWeight: '600',
  },
  selectedText: {
    color: '#FFFFFF',
  },
});
