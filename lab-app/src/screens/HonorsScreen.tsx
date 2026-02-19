import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { honors } from '../data/honors';

export default function HonorsScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>荣誉奖项</Text>
        <Text style={styles.headerSubtitle}>实验室获奖荣誉</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{honors.length}</Text>
            <Text style={styles.statLabel}>项荣誉</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.content}>
        {honors.map((honor, index) => (
          <View key={honor.id} style={styles.honorCard}>
            <View style={styles.honorIndex}>
              <Text style={styles.honorIndexText}>{index + 1}</Text>
            </View>
            <View style={styles.honorContent}>
              <Text style={styles.honorTitle}>{honor.title}</Text>
              {honor.year && (
                <View style={styles.yearBadge}>
                  <Text style={styles.yearText}>{honor.year}年</Text>
                </View>
              )}
            </View>
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
  honorCard: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  honorIndex: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffd700',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  honorIndexText: {
    fontSize: fontSize.md,
    fontWeight: 'bold',
    color: '#000',
  },
  honorContent: {
    flex: 1,
  },
  honorTitle: {
    fontSize: fontSize.md,
    color: colors.text,
    fontWeight: '500',
  },
  yearBadge: {
    backgroundColor: '#fff3e0',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  yearText: {
    fontSize: fontSize.xs,
    color: '#ff9800',
    fontWeight: '600',
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
