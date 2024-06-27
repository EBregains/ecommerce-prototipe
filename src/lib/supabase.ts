export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      orders: {
        Row: {
          buyed_at: string
          color: string
          created_at: string
          id: string
          plastic_type: string
          product_id: string
          quantity: number
          shipment_details: string
          status: string
          total_price: number
          unit_price: number
          user_id: string
        }
        Insert: {
          buyed_at?: string
          color?: string
          created_at?: string
          id?: string
          plastic_type?: string
          product_id: string
          quantity: number
          shipment_details: string
          status?: string
          total_price: number
          unit_price: number
          user_id: string
        }
        Update: {
          buyed_at?: string
          color?: string
          created_at?: string
          id?: string
          plastic_type?: string
          product_id?: string
          quantity?: number
          shipment_details?: string
          status?: string
          total_price?: number
          unit_price?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_shipment_details_fkey"
            columns: ["shipment_details"]
            isOneToOne: false
            referencedRelation: "shipments"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          base_price: number
          caracteristics: Json | null
          category: string | null
          created_at: string
          description: string | null
          edited_at: string
          id: string
          images: string[] | null
          images_alt: string
          n_purchases: number | null
          rating: number | null
          slug: string
          stock: number
          title: string
          variants: Json | null
        }
        Insert: {
          base_price: number
          caracteristics?: Json | null
          category?: string | null
          created_at?: string
          description?: string | null
          edited_at?: string
          id?: string
          images?: string[] | null
          images_alt?: string
          n_purchases?: number | null
          rating?: number | null
          slug: string
          stock: number
          title: string
          variants?: Json | null
        }
        Update: {
          base_price?: number
          caracteristics?: Json | null
          category?: string | null
          created_at?: string
          description?: string | null
          edited_at?: string
          id?: string
          images?: string[] | null
          images_alt?: string
          n_purchases?: number | null
          rating?: number | null
          slug?: string
          stock?: number
          title?: string
          variants?: Json | null
        }
        Relationships: []
      }
      shipments: {
        Row: {
          created_at: string
          id: string
          shipment_status: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          shipment_status?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          shipment_status?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
