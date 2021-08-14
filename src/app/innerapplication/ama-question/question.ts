export interface QuestionData {
    data: {
      views: Number,
      commentCount: Number,
      answered: Boolean,
      _id: string,
      createdAt: string,
      updatedAt: string,
      askedBy: string,
      description: string,
      title: string
    },
    message: string
}
