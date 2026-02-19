import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { pi } from '../data/pi';

interface PIScreenProps {
  navigation: any;
}

export default function PIScreen({ navigation }: PIScreenProps) {
  const handleEmail = () => {
    Linking.openURL(`mailto:${pi.email}`);
  };
  
  const handleWebsite = () => {
    Linking.openURL(pi.websiteZh);
  };
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 头部 */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{pi.nameZh.charAt(0)}</Text>
          </View>
        </View>
        <Text style={styles.name}>{pi.nameZh}</Text>
        <Text style={styles.nameEn}>{pi.nameEn}</Text>
        <Text style={styles.title}>{pi.titleZh}</Text>
        <Text style={styles.affiliation}>{pi.affiliationZh}</Text>
      </View>
      
      {/* 个人简介 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>个人简介</Text>
        <View style={styles.card}>
          <Text style={styles.bio}>{pi.bioZh}</Text>
        </View>
      </View>
      
      {/* 研究方向 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>研究方向</Text>
        <View style={styles.tagsContainer}>
          {pi.researchFocusZh?.map((item, index) => (
            <View key={index} style={styles.tag}>
              <Text style={styles.tagText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
      
      {/* 教育背景 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>教育背景</Text>
        <View style={styles.card}>
          {pi.educationZh?.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </View>
      </View>
      
      {/* 工作经历 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>工作经历</Text>
        <View style={styles.card}>
          {pi.experienceZh?.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </View>
      </View>
      
      {/* 学术任职 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>学术任职</Text>
        <View style={styles.card}>
          {pi.appointmentsZh?.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </View>
      </View>
      
      {/* 招生信息 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>招生信息</Text>
        <View style={styles.recruitCard}>
          <Text style={styles.recruitText}>{pi.recruitmentZh}</Text>
        </View>
      </View>
      
      {/* 联系方式 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>联系方式</Text>
        <View style={styles.contactCard}>
          <TouchableOpacity style={styles.contactButton} onPress={handleEmail}>
            <Text style={styles.contactButtonText}>📧 发送邮件</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contactButton} onPress={handleWebsite}>
            <Text style={styles.contactButtonText}>🌐 访问主页</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.addressCard}>
          <Text style={styles.addressLabel}>📍 地址</Text>
          <Text style={styles.addressText}>{pi.addressZh}</Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 微纳气泡实验室</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: colors.primary,
    padding: spacing.xl,
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  avatarContainer: {
    marginBottom: spacing.md,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#ffffff',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  nameEn: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: fontSize.lg,
    color: '#ffffff',
    fontWeight: '600',
    marginTop: spacing.xs,
  },
  affiliation: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
    textAlign: 'center',
  },
  section: {
    padding: spacing.md,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  bio: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 24,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: 20,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },
  tagText: {
    fontSize: fontSize.sm,
    color: '#ffffff',
    fontWeight: '500',
  },
  listItem: {
    fontSize: fontSize.md,
    color: colors.text,
    lineHeight: 26,
    marginBottom: spacing.xs,
  },
  recruitCard: {
    backgroundColor: '#e8f5e9',
    borderRadius: 12,
    padding: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: '#4caf50',
  },
  recruitText: {
    fontSize: fontSize.md,
    color: '#2e7d32',
    lineHeight: 24,
  },
  contactCard: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: spacing.md,
  },
  contactButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: 25,
    flex: 1,
    marginHorizontal: spacing.xs,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: fontSize.md,
    color: '#ffffff',
    fontWeight: '600',
  },
  addressCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    elevation: 2,
  },
  addressLabel: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  addressText: {
    fontSize: fontSize.md,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  footer: {
    padding: spacing.xl,
    alignItems: 'center',
  },
  footerText: {
    fontSize: fontSize.sm,
    color: colors.textLight,
  },
});
