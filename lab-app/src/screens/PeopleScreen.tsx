import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Image, Linking } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import { people, PersonRole } from '../data/people';
import { pi } from '../data/pi';

interface PeopleScreenProps {
  navigation: any;
}

// 本地静态图片映射（Expo Web/Native 均可稳定加载）
const personImages: Record<string, any> = {
  pi: require('../../assets/people/pi.jpg'),
  chenjinxin: require('../../assets/people/chenjinxin.jpg'),
  chentianxiang: require('../../assets/people/chentianxiang.jpg'),
  dengguoxiang: require('../../assets/people/dengguoxiang.jpg'),
  donghaoyu: require('../../assets/people/donghaoyu.jpg'),
  dutonghe: require('../../assets/people/dutonghe.jpg'),
  gengjiadong: require('../../assets/people/gengjiadong.jpg'),
  guanxiaowei: require('../../assets/people/guanxiaowei.jpg'),
  hanchongyang: require('../../assets/people/hanchongyang.jpg'),
  huxiaoqi: require('../../assets/people/huxiaoqi.jpg'),
  jiaqi: require('../../assets/people/jiaqi.jpg'),
  liruiyuan: require('../../assets/people/liruiyuan.jpg'),
  lishengjing: require('../../assets/people/lishengjing.jpg'),
  liuziyi: require('../../assets/people/liuziyi.jpg'),
  luopeiyuan: require('../../assets/people/luopeiyuan.jpg'),
  songyang: require('../../assets/people/songyang.jpg'),
  wangshuxin: require('../../assets/people/wangshuxin.jpg'),
  wumengquan: require('../../assets/people/wumengquan.jpg'),
  yangci: require('../../assets/people/yangci.jpg'),
  yuxinrui: require('../../assets/people/yuxinrui.jpg'),
  zhanghongkui: require('../../assets/people/zhanghongkui.jpg'),
  zhangyi: require('../../assets/people/zhangyi.jpg'),
  zhaohangjia: require('../../assets/people/zhaohangjia.jpg'),
  zhouzhichao: require('../../assets/people/zhouzhichao.jpg'),
};

const getGroupedPeople = () => {
  const groups: Record<string, typeof people> = {
    PI: [],
    Faculty: [],
    Staff: [],
    PhD: [],
    Master: [],
    Undergrad: [],
    Alumni: [],
  };

  people.forEach((person) => {
    groups[person.role].push(person);
  });

  return groups;
};

const roleLabels: Record<PersonRole, string> = {
  PI: '首席研究员 (PI)',
  Faculty: '教师团队',
  Staff: '工作人员',
  PhD: '博士研究生',
  Master: '硕士研究生',
  Undergrad: '本科生',
  Alumni: '已毕业成员',
};

const roleColors: Record<PersonRole, string> = {
  PI: '#1e88e5',
  Faculty: '#7e57c2',
  Staff: '#26a69a',
  PhD: '#ef5350',
  Master: '#ff7043',
  Undergrad: '#5c6bc0',
  Alumni: '#78909c',
};

export default function PeopleScreen({ navigation }: PeopleScreenProps) {
  const groupedPeople = getGroupedPeople();

  const handleEmail = () => {
    Linking.openURL(`mailto:${pi.email}`);
  };

  const renderPI = () => (
    <View style={styles.group}>
      <View style={styles.groupHeader}>
        <View style={[styles.groupBadge, { backgroundColor: '#1e88e5' }]}>
          <Text style={styles.groupBadgeText}>实验室负责人</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.piCard} activeOpacity={0.8}>
        <View style={styles.piAvatarContainer}>
          <Image source={personImages.pi} style={styles.piAvatar} resizeMode="cover" />
        </View>
        <View style={styles.piInfo}>
          <Text style={styles.piName}>{pi.nameZh}</Text>
          <Text style={styles.piNameEn}>{pi.nameEn}</Text>
          <Text style={styles.piTitle}>{pi.titleZh}</Text>
          <Text style={styles.piAffiliation}>{pi.affiliationZh}</Text>
          <TouchableOpacity style={styles.emailButton} onPress={handleEmail}>
            <Text style={styles.emailButtonText}>📧 {pi.email}</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <View style={styles.piBio}>
        <Text style={styles.piBioText}>{pi.bioZh}</Text>
      </View>

      <Text style={styles.piResearchTitle}>研究方向</Text>
      <View style={styles.researchTags}>
        {pi.researchFocusZh?.map((item, index) => (
          <View key={index} style={styles.researchTag}>
            <Text style={styles.researchTagText}>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );

  const renderAvatar = (id: string, nameZh: string) => {
    const source = personImages[id];
    if (source) {
      return <Image source={source} style={styles.memberAvatar} resizeMode="cover" />;
    }
    return (
      <View style={[styles.memberAvatar, styles.memberAvatarFallback]}>
        <Text style={styles.memberAvatarFallbackText}>{nameZh.charAt(0)}</Text>
      </View>
    );
  };

  const renderGroup = (role: PersonRole) => {
    const members = groupedPeople[role];
    if (members.length === 0) return null;

    return (
      <View key={role} style={styles.group}>
        <View style={styles.groupHeader}>
          <View style={[styles.groupBadge, { backgroundColor: roleColors[role] }]}>
            <Text style={styles.groupBadgeText}>{roleLabels[role]}</Text>
          </View>
          <Text style={styles.groupCount}>{members.length}人</Text>
        </View>

        <View style={styles.membersGrid}>
          {members.map((person) => (
            <TouchableOpacity key={person.id} style={styles.memberCard} activeOpacity={0.8}>
              {renderAvatar(person.id, person.nameZh)}
              <Text style={styles.memberName} numberOfLines={1}>
                {person.nameZh}
              </Text>
              <Text style={styles.memberNameEn} numberOfLines={1}>
                {person.nameEn}
              </Text>
              <Text style={styles.memberIntro} numberOfLines={2}>
                {person.introZh}
              </Text>
              {person.cohort && (
                <View style={styles.cohortBadge}>
                  <Text style={styles.cohortText}>{person.cohort}级</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>团队成员</Text>
        <Text style={styles.headerSubtitle}>天津大学微纳气泡实验室</Text>
      </View>

      {renderPI()}
      {renderGroup('Faculty')}
      {renderGroup('Staff')}
      {renderGroup('PhD')}
      {renderGroup('Master')}
      {renderGroup('Undergrad')}
      {renderGroup('Alumni')}

      <View style={styles.footer}>
        <Text style={styles.footerText}>共 {people.length} 位成员</Text>
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
    padding: spacing.lg,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: fontSize.sm,
    color: 'rgba(255,255,255,0.8)',
    marginTop: spacing.xs,
  },
  group: {
    padding: spacing.md,
    paddingTop: spacing.sm,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  groupBadge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: 20,
  },
  groupBadgeText: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: '#ffffff',
  },
  groupCount: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  piCard: {
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.lg,
    flexDirection: 'row',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    marginBottom: spacing.md,
  },
  piAvatarContainer: {
    marginRight: spacing.md,
  },
  piAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
  },
  piInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  piName: {
    fontSize: fontSize.xl,
    fontWeight: 'bold',
    color: colors.text,
  },
  piNameEn: {
    fontSize: fontSize.sm,
    color: colors.textSecondary,
  },
  piTitle: {
    fontSize: fontSize.md,
    color: colors.primary,
    fontWeight: '600',
    marginTop: 2,
  },
  piAffiliation: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    marginTop: 2,
  },
  emailButton: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: spacing.xs,
  },
  emailButtonText: {
    fontSize: fontSize.xs,
    color: colors.primary,
  },
  piBio: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  piBioText: {
    fontSize: fontSize.sm,
    color: colors.text,
    lineHeight: 22,
  },
  piResearchTitle: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  researchTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  researchTag: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: spacing.xs,
    marginBottom: spacing.xs,
  },
  researchTagText: {
    fontSize: fontSize.xs,
    color: '#ffffff',
  },
  membersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
  },
  memberCard: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 16,
    padding: spacing.md,
    marginHorizontal: '1.5%',
    marginBottom: spacing.md,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  memberAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    marginBottom: spacing.sm,
  },
  memberAvatarFallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  memberAvatarFallbackText: {
    fontSize: 24,
    color: '#fff',
    fontWeight: '700',
  },
  memberName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
  },
  memberNameEn: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  memberIntro: {
    fontSize: fontSize.xs,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 16,
  },
  cohortBadge: {
    backgroundColor: '#e3f2fd',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
    marginTop: spacing.xs,
  },
  cohortText: {
    fontSize: fontSize.xs,
    color: colors.primary,
    fontWeight: '500',
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
