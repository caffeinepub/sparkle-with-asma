import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface AddStoryInput {
    title: string;
    colorTheme: string;
    body: string;
    bodyAr: string;
    emoji: string;
    titleAr: string;
}
export interface UpdateStoryInput {
    id: bigint;
    title: string;
    colorTheme: string;
    body: string;
    bodyAr: string;
    emoji: string;
    titleAr: string;
}
export interface Story {
    id: bigint;
    title: string;
    colorTheme: string;
    body: string;
    bodyAr: string;
    emoji: string;
    titleAr: string;
}
export interface backendInterface {
    addStory(input: AddStoryInput): Promise<Story>;
    deleteStory(id: bigint): Promise<void>;
    getStories(): Promise<Array<Story>>;
    updateStory(input: UpdateStoryInput): Promise<void>;
}
