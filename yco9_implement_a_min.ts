interface ModelMetadata {
  id: string;
  name: string;
  type: string;
  createdAt: Date;
}

interface Metric {
  name: string;
  value: number;
  timestamp: Date;
}

interface ModelMonitorConfig {
  interval: number; // in seconds
  metrics: string[];
}

interface ModelMonitor {
  id: string;
  metadata: ModelMetadata;
  config: ModelMonitorConfig;
  metrics: Metric[];
  addMetric(metric: Metric): void;
  startMonitoring(): void;
  stopMonitoring(): void;
}

class ModelMonitorImpl implements ModelMonitor {
  id: string;
  metadata: ModelMetadata;
  config: ModelMonitorConfig;
  metrics: Metric[];

  constructor(id: string, metadata: ModelMetadata, config: ModelMonitorConfig) {
    this.id = id;
    this.metadata = metadata;
    this.config = config;
    this.metrics = [];
  }

  addMetric(metric: Metric): void {
    this.metrics.push(metric);
  }

  startMonitoring(): void {
    // implement logic to start monitoring the model
  }

  stopMonitoring(): void {
    // implement logic to stop monitoring the model
  }
}

interface API {
  getModelMonitors(): Promise<ModelMonitor[]>;
  getModelMonitor(id: string): Promise<ModelMonitor | null>;
  createModelMonitor(metadata: ModelMetadata, config: ModelMonitorConfig): Promise<ModelMonitor>;
  updateModelMonitor(id: string, config: ModelMonitorConfig): Promise<void>;
  deleteModelMonitor(id: string): Promise<void>;
}

class APIService {
  private modelMonitors: ModelMonitor[];

  constructor() {
    this.modelMonitors = [];
  }

  getModelMonitors(): Promise<ModelMonitor[]> {
    return Promise.resolve(this.modelMonitors);
  }

  getModelMonitor(id: string): Promise<ModelMonitor | null> {
    return Promise.resolve(this.modelMonitors.find((mm) => mm.id === id) || null);
  }

  createModelMonitor(metadata: ModelMetadata, config: ModelMonitorConfig): Promise<ModelMonitor> {
    const modelMonitor = new ModelMonitorImpl(uuid.v4(), metadata, config);
    this.modelMonitors.push(modelMonitor);
    return Promise.resolve(modelMonitor);
  }

  updateModelMonitor(id: string, config: ModelMonitorConfig): Promise<void> {
    const modelMonitor = this.modelMonitors.find((mm) => mm.id === id);
    if (modelMonitor) {
      modelMonitor.config = config;
    }
    return Promise.resolve();
  }

  deleteModelMonitor(id: string): Promise<void> {
    this.modelMonitors = this.modelMonitors.filter((mm) => mm.id !== id);
    return Promise.resolve();
  }
}

const apiService = new APIService();

export { apiService };