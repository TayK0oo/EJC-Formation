class UserFormationService {
    private static instance: UserFormationService;
    private userFormations: { [userId: number]: number[] } = {};
  
    private constructor() {}
  
    public static getInstance(): UserFormationService {
      if (!UserFormationService.instance) {
        UserFormationService.instance = new UserFormationService();
      }
      return UserFormationService.instance;
    }
  
    async linkUserToFormation(userId: number, formationId: number): Promise<void> {
      if (!this.userFormations[userId]) {
        this.userFormations[userId] = [];
      }
      if (!this.userFormations[userId].includes(formationId)) {
        this.userFormations[userId].push(formationId);
        // Here you would typically make an API call to update the backend
        // await api.post(`/user-formations`, { userId, formationId });
      }
    }
  
    async getUserFormations(userId: number): Promise<number[]> {
      // In a real application, you'd fetch this from an API
      // const response = await api.get(`/user-formations/${userId}`);
      // return response.data;
      return this.userFormations[userId] || [];
    }
  }
  
  export default UserFormationService.getInstance();