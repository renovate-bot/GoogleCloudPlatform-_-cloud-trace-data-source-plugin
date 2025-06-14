/**
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { DataQuery, SelectableValue } from '@grafana/data';
import {
  DataSourceOptions,
  GoogleAuthType,
  DataSourceSecureJsonData as BaseDataSourceSecureJsonData,
} from '@grafana/google-sdk';

export interface DataSourceSecureJsonData extends BaseDataSourceSecureJsonData {
  accessToken?: string;
}

export const authTypes: Array<SelectableValue<string>> = [
  { label: 'Google JWT File', value: GoogleAuthType.JWT },
  { label: 'GCE Default Service Account', value: GoogleAuthType.GCE },
  { label: 'Access Token', value: 'accessToken' },
];

/**
 * DataSourceOptionsExt adds any extra data to DataSourceOptions
 */
export interface DataSourceOptionsExt extends DataSourceOptions {
  gceDefaultProject?: string;
  serviceAccountToImpersonate?: string;
  usingImpersonation?: boolean;
}

/**
 * Query from Grafana
 */
export interface Query extends DataQuery {
  queryText?: string;
  traceId?: string;
  projectId: string;
  queryType?: string;
}

/**
 * Query that basically gets all traces
 */
export const defaultQuery: Partial<Query> = {
  queryText: `MinLatency:100ms`,
};

/**
 * These are options configured for each DataSource instance.
 */
export type CloudTraceOptions = DataSourceOptionsExt;

/**
 * Enum for supported variables
 */
export enum TraceVariables {
  Projects = 'projects',
}

/**
 * Supported types for template variables
 */
export interface CloudTraceVariableQuery extends DataQuery {
  selectedQueryType: string;
  projectId: string;
}

/**
 * Scope data for template variables
 */
export interface VariableScopeData {
  selectedQueryType: string;
  projects: SelectableValue[];
  projectId: string;
  loading: boolean;
}
