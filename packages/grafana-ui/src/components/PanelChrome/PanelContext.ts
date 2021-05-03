import { EventBusSrv, EventBus, DashboardCursorSync } from '@grafana/data';
import React from 'react';

/** @alpha */
export interface PanelContext {
  eventBus: EventBus;

  /** Dashboard panels sync */
  sync?: DashboardCursorSync;

  /**
   * Called when a component wants to change the color for a series
   *
   * @alpha -- experimental
   */
  onSeriesColorChange?: (label: string, color: string) => void;
}

export const PanelContextRoot = React.createContext<PanelContext>({
  eventBus: new EventBusSrv(),
});

/**
 * @alpha
 */
export const PanelContextProvider = PanelContextRoot.Provider;

/**
 * @alpha
 */
export const usePanelContext = () => React.useContext(PanelContextRoot);
