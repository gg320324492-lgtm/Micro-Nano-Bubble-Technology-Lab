import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { patents } from '../data/patents';

export default function PatentsScreen() {
  // 按年份分组
  const getGroupedPatents = () => {
    const groups: Record<number, typeof patents> = {};
    patents.forEach((patent) => {
      const year = patent.year || 2024;
      if (!groups[year]) groups[year] = [];
      groups[year].push(patent);
    });
    return Object.keys(groups)
      .map(Number)
      .sort((a, b) => b - a)
      .map(year => ({ year, list: groups[year] }));
  };
  
  const groupedPatents = getGroupedPatents();
  
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>专利成果</Text>
        <Text style={styles.headerSubtitle}>发明专利与技术成果</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{patents.length}</Text>
            <Text style={styles.statLabel}>项专利</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        {groupedPatents.map((group) => (
          <View key={group.year} style={styles.yearGroup}>
            <View style={styles.yearHeader}>
              <View style={styles.yearBadge}>
                <Text style={styles.yearText}>{group.year}</Text>
              </View>
              <Text style={styles.yearCount}>{group.list.length} 项</Text>
            </View>
            
            {group.list.map((patent, index) => (
              <View key={patent.id} style={styles.patentCard}>
                <Text style={styles.patentTitle}>{patent.title}</Text>
                {patent.number && (
                  <View style={styles.numberBadge}>
                    <Text style={styles.numberText}>📜 {patent.number}</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        ))}
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
    paddingTop: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: fontSize.md,
    color: 'rgba(255,255,255,0.9)',
    marginTop: spacing.xs,
  },
  statsContainer: {
    marginTop: spacing.md,
  },
  statBox: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  statLabel: {
    fontSize: fontSize.xs,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
  },
  content: {
    padding: spacing.md,
  },
  yearGroup: {
    marginBottom: spacing.md,
  },
  yearHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  yearBadge: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 16,
  },
  yearText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  yearCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  patentCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  patentTitle: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
    lineHeight: 22,
  },
  numberBadge: {
    backgroundColor: '#f5f5f5',
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs,
    borderRadius: 6,
    alignSelf: 'flex-start',
    marginTop: spacing.sm,
  },
  numberText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontFamily: 'monospace',
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
