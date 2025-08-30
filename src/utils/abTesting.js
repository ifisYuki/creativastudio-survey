import { STUDY_CONFIG } from '../config/studyConfig.js';
import { SecureStorage } from './security.js';

// AB Testing utilities for the randomizor application
export class ABTestingManager {
  constructor(deviceId) {
    this.deviceId = deviceId;
    this.testGroup = null;
  }

  assignTestGroup() {
    // Check if user already has a group assigned
    const existingGroup = SecureStorage.getItem(`ab_test_group_${this.deviceId}`);
    if (existingGroup) {
      this.testGroup = existingGroup;
      return existingGroup;
    }

    // Randomly assign group based on split ratio
    const random = Math.random();
    const group = random < STUDY_CONFIG.abTesting.splitRatio ? 
      STUDY_CONFIG.abTesting.groups[0] : 
      STUDY_CONFIG.abTesting.groups[1];
    
    // Store the assignment
    SecureStorage.setItem(`ab_test_group_${this.deviceId}`, group);
    
    this.testGroup = group;
    return group;
  }

  getTestGroup() {
    if (!this.testGroup) {
      this.assignTestGroup();
    }
    return this.testGroup;
  }

  getGroupName() {
    const group = this.getTestGroup();
    return STUDY_CONFIG.abTesting.groupNames[group] || group;
  }

  getFormUrl() {
    const group = this.getTestGroup();
    return STUDY_CONFIG.formUrls[group];
  }

  // Get group statistics (for research purposes)
  getGroupStats() {
    const allGroups = STUDY_CONFIG.abTesting.groups;
    const stats = {};
    
    allGroups.forEach(group => {
      const count = SecureStorage.getItem(`ab_test_group_count_${group}`) || 0;
      stats[group] = {
        count: count,
        name: STUDY_CONFIG.abTesting.groupNames[group],
        percentage: 0
      };
    });

    // Calculate percentages
    const total = Object.values(stats).reduce((sum, stat) => sum + stat.count, 0);
    if (total > 0) {
      Object.values(stats).forEach(stat => {
        stat.percentage = Math.round((stat.count / total) * 100);
      });
    }

    return stats;
  }

  // Increment group count (for research purposes)
  incrementGroupCount() {
    const group = this.getTestGroup();
    const currentCount = SecureStorage.getItem(`ab_test_group_count_${group}`) || 0;
    SecureStorage.setItem(`ab_test_group_count_${group}`, currentCount + 1);
  }

  // Reset group assignment (for testing purposes)
  resetGroupAssignment() {
    SecureStorage.removeItem(`ab_test_group_${this.deviceId}`);
    this.testGroup = null;
  }

  // Get all assignments (for research purposes)
  getAllAssignments() {
    const assignments = [];
    const keys = Object.keys(localStorage);
    
    keys.forEach(key => {
      if (key.startsWith('ab_test_group_') && !key.includes('count')) {
        const deviceId = key.replace('ab_test_group_', '');
        const group = SecureStorage.getItem(key);
        const completed = SecureStorage.getItem(`ab_test_completed_${deviceId}`);
        
        assignments.push({
          deviceId: deviceId,
          group: group,
          completed: completed === true
        });
      }
    });

    return assignments;
  }

  // Export data for research analysis
  exportData() {
    const assignments = this.getAllAssignments();
    const stats = this.getGroupStats();
    
    return {
      timestamp: new Date().toISOString(),
      totalParticipants: assignments.length,
      completedParticipants: assignments.filter(a => a.completed).length,
      groupAssignments: assignments,
      groupStatistics: stats,
      studyConfig: {
        title: STUDY_CONFIG.title,
        abTesting: STUDY_CONFIG.abTesting,
        formUrls: STUDY_CONFIG.formUrls
      }
    };
  }
}

// Helper function to create a new AB testing manager
export const createABTestingManager = (deviceId) => {
  return new ABTestingManager(deviceId);
};
