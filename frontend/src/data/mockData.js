export const mockFaceBuilderData = {
  models: [
    {
      id: 1,
      name: "Face Model 01",
      vertices: 8942,
      faces: 17884,
      status: "Ready",
      parameters: {
        faceWidth: 50,
        faceHeight: 60,
        eyeDistance: 45,
        noseHeight: 55,
        mouthWidth: 40,
        chinHeight: 50
      }
    }
  ],
  referencePhotos: [
    {
      id: 1,
      name: "front_view.jpg",
      view: "Front",
      aligned: true,
      url: "/api/placeholder/200/200"
    },
    {
      id: 2,
      name: "side_view.jpg", 
      view: "Profile",
      aligned: false,
      url: "/api/placeholder/200/200"
    },
    {
      id: 3,
      name: "three_quarter.jpg",
      view: "3/4 View", 
      aligned: false,
      url: "/api/placeholder/200/200"
    }
  ],
  viewportModes: [
    { id: 'wireframe', name: 'Wireframe' },
    { id: 'solid', name: 'Solid' },
    { id: 'material', name: 'Material Preview' },
    { id: 'rendered', name: 'Rendered' }
  ],
  tools: [
    { id: 'select', name: 'Select Tool' },
    { id: 'move', name: 'Move Tool' },
    { id: 'rotate', name: 'Rotate Tool' },
    { id: 'scale', name: 'Scale Tool' },
    { id: 'pin', name: 'Pin Tool' }
  ]
};