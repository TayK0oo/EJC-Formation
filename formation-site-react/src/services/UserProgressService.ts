class UserProgressService {
    private static instance: UserProgressService;
    private userProgress: { [userId: number]: { [formationId: number]: number } } = {};
  
    private constructor() {}
  
    public static getInstance(): UserProgressService {
      if (!UserProgressService.instance) {
        UserProgressService.instance = new UserProgressService();
      }
      return UserProgressService.instance;
    }
  
    async updateProgress(userId: number, formationId: number, progress: number): Promise<void> {
      if (!this.userProgress[userId]) {
        this.userProgress[userId] = {};
      }
      this.userProgress[userId][formationId] = progress;
      // Here you would typically make an API call to update the backend
      // await api.post(`/user-progress`, { userId, formationId, progress });
    }
  
    async getProgress(userId: number, formationId: number): Promise<number> {
      // In a real application, you'd fetch this from an API
      // const response = await api.get(`/user-progress/${userId}/${formationId}`);
      // return response.data.progress;
      return this.userProgress[userId]?.[formationId] || 0;
    }
  }
  
  export default UserProgressService.getInstance();