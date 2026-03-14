import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Array "mo:core/Array";
import Runtime "mo:core/Runtime";


// Sparkle with Asma backend

actor {
  public type Story = {
    id : Nat;
    title : Text;
    titleAr : Text;
    body : Text;
    bodyAr : Text;
    emoji : Text;
    colorTheme : Text;
  };

  let stories = Map.empty<Nat, Story>();
  var nextId = 1;

  public type AddStoryInput = {
    title : Text;
    titleAr : Text;
    body : Text;
    bodyAr : Text;
    emoji : Text;
    colorTheme : Text;
  };

  public type UpdateStoryInput = {
    id : Nat;
    title : Text;
    titleAr : Text;
    body : Text;
    bodyAr : Text;
    emoji : Text;
    colorTheme : Text;
  };

  public func addStory(input : AddStoryInput) : async Story {
    let story : Story = {
      id = nextId;
      title = input.title;
      titleAr = input.titleAr;
      body = input.body;
      bodyAr = input.bodyAr;
      emoji = input.emoji;
      colorTheme = input.colorTheme;
    };
    stories.add(nextId, story);
    nextId += 1;
    story;
  };

  public query ({ caller }) func getStories() : async [Story] {
    stories.values().toArray();
  };

  public func updateStory(input : UpdateStoryInput) : async () {
    switch (stories.get(input.id)) {
      case (null) { Runtime.trap("Story not found") };
      case (?_) {
        let updatedStory : Story = {
          id = input.id;
          title = input.title;
          titleAr = input.titleAr;
          body = input.body;
          bodyAr = input.bodyAr;
          emoji = input.emoji;
          colorTheme = input.colorTheme;
        };
        stories.add(input.id, updatedStory);
      };
    };
  };

  public func deleteStory(id : Nat) : async () {
    switch (stories.get(id)) {
      case (null) { Runtime.trap("Story not found") };
      case (?_) {
        stories.remove(id);
      };
    };
  };
};
